import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useUser } from '../contexts/User';
import { db } from '../Firebase';
import feesPortal from './FeesPortalComponent/FeesPortal.module.css'

function FeesPortal() {

    const path = (loginType) => {
        var userType;
        switch (loginType) {
            case 1:
                userType = "Students";
                break;
            case 2:
                userType = "FnA";
                break;
            case 3:
                userType = "HoD";
                break;
            default:
                return null;
        }
        return userType
    }

    const [state, dispatch] = useUser();
    const fee = state?.user?.fees;
    const payFees = async () => {
        var userType = path(parseInt(state.userType));
        var email = state.user.email;
        db.collection("users").doc(userType).collection(email).doc(email).update({
            fees: {
                latefee: state.user.fees.latefee,
                semfee: state.user.fees.semfee,
                paid: state.user.fees.semfee + state.user.fees.latefee,
                due: 0,
            },
        });

        try{
            var docRef = db.collection("users").doc(userType).collection(email);
        var alldata = await docRef.get();
        alldata.forEach((doc) => {
            if (doc.data()) {
                dispatch({
                  type: "SET_USER",
                  user: { ...doc.data() },
                  userType: state.userType,
                });
                localStorage.setItem('user', JSON.stringify(doc.data()));

            } else {
              console.log(doc.data());
            }
          });
        } catch(error){
            console.log(error);
        }
        localStorage.setItem('user', JSON.stringify(state.user));
        db.collection("feeapproval").doc(state.user.email).set({
            description: JSON.stringify(state.user.fees)
        })
    }
    return (
        state.user && (
            <div className={feesPortal.screen}>
                <div className={feesPortal.infoDiv} >
                    <h1>FEE STATUS</h1>
                    {
                        state.user.feesApproved === true ? (
                            <div>
                                Fees Paid And Approved
                            </div>
                        ) : (
                            <div className={feesPortal.infoGrid}>
                                <div>
                                    <div>SEMESTER FEE :</div>
                                    <div>{fee?.semfee}</div>
                                </div>
                                <div>
                                    <div>LATE FEE :</div>
                                    <div>{fee?.latefee}</div>
                                </div>
                                <div>
                                    <div>PAID FEES :</div>
                                    <div>{fee?.paid}</div>
                                </div>
                                <div>
                                    <div>DUE FEE :</div>
                                    <div>{fee?.due}</div>
                                </div>
                                <div>
                                    <div>DEADLINE :</div>
                                    <div>20-03-2021</div>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    state.user.feesApproved === true ? (null) : (
                        fee.semfee + fee.latefee === fee.paid ? (
                            <div className={feesPortal.ApprovalDiv}>Fees Submitted. Under Approval Process</div>
                        ) : (
                            <div className={feesPortal.buttonDiv}><Button onClick={() => payFees()}>Pay Fees</Button></div>
                        )
                    )
                }
            </div>)
    )
}

export default FeesPortal
