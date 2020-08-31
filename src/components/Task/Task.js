import React from 'react'

export default function Task({id, name, create_date, is_done}) {
    return (
        <div>
            Task id: {id}
            Task name: {name}
            Task create_date: {create_date}
            Task is_done: {is_done}
        </div>
    )
}
