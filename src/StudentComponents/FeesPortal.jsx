import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import { useUser } from '../contexts/User';
import { db } from '../Firebase';
import feesPortal from './FeesPortalComponent/FeesPortal.module.css'

function FeesPortal() {

    const path =(loginType)=>{
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
    const fee=state?.user?.fees;
    const payFees=()=>{
        dispatch({
            type:"PAY_FEE",
        })
        // db.collection("feeapproval").doc(state.user.email).set({
        //     description:JSON.stringify(state.user.fees)
        // })
        var a=path(state.userType);
        var email=state.user.email;
        console.log(email);
        db.collection("users").doc(a).collection(email).doc(email).set({
            ...state.user
        });
        // localStorage.setItem('user', JSON.stringify(state.user));
    }
    return (
        state.user &&(
        <div className={feesPortal.screen}>
            <div className={feesPortal.infoDiv} >
                <h1>FEE STATUS</h1>
                {
                    state.user.feesApproved===true?(
                        <div>
                            Fees Paid And Approved
                        </div>
                    ):(
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
                state.user.feesApproved===true?(null):(
                        fee.semfee+fee.latefee===fee.paid ? (
                            <div className={feesPortal.ApprovalDiv}>Fees Submitted. Under Approval Process</div>
                        ) : (
                            <div className={feesPortal.buttonDiv}><Button onClick={()=>payFees()}>Pay Fees</Button></div>
                        )
                )
            }
        </div>)
    )
}

export default FeesPortal
