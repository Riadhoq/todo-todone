import React from 'react'
import { Checkbox } from '@material-ui/core'
import './Task.css'

export default function Task({id, name, create_date, is_done}) {
    return (
        <div className="task-details" >
            <Checkbox name={id} checked={is_done} />
            <span className={`task-title ${is_done? "scratched":null}`}>{name}</span>
        </div>
    )
}
