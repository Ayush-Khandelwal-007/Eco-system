import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import { useUser } from '../contexts/User';
import { db } from '../Firebase';
import feesPortal from './FeesPortalComponent/FeesPortal.module.css'

function FeesPortal() {
    const [state, dispatch] = useUser();
    const fee=state?.user?.fees;
    const [fees, setfees] = useState(fee.due)
    const [latefee, setlatefee] = useState(fee.latefee)
    const payFees=()=>{
        dispatch({
            type:"PAY_FEE",
        })
        db.collection("feeapproval").add({
            id:state.user.email,
            description:JSON.stringify(state.user.fees)
        })
        setfees(0.00);
        setlatefee(0.00);
    }
    return (
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
        </div>
    )
}

export default FeesPortal
