import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import feesPortal from './FeesPortalComponent/FeesPortal.module.css'

function FeesPortal() {
    const [fees, setfees] = useState(72355.00)
    const [latefee, setlatefee] = useState(1500.00)
    const payFees=()=>{
        setfees(0.00);
        setlatefee(0.00);
    }
    return (
        <div className={feesPortal.screen}>
            <div className={feesPortal.infoDiv} >
                <h1>FEE STATUS</h1>
                <div className={feesPortal.infoGrid}>
                    <div>
                        <div>AMOUNT PAID :</div>
                        <div>{fees}</div>
                    </div>
                    <div>
                        <div>LATE FEE :</div>
                        <div>{latefee}</div>
                    </div>
                    <div>
                        <div>DEADLINE :</div>
                        <div>20/3/21</div>
                    </div>
                </div>
            </div>
            <div className={feesPortal.buttonDiv}><Button disabled={fees+latefee==0} onClick={()=>payFees()}>Pay Fees</Button></div>
        </div>
    )
}

export default FeesPortal
