import React from "react";
import {Button, ButtonGroup, Popover, Whisper} from "rsuite";

const TableConformButton = ({description, onConfirm, color, placement, ...props}) => {

    return <Whisper
        placement={placement || 'left'}
        trigger={'active'}
        speaker={
            <Popover title="确认提示">
                <p>{description}</p>
                <ButtonGroup size={'xs'}>
                    <Button onClick={() => onConfirm && onConfirm()} appearance={"primary"} color={color}>{props.children}</Button>
                </ButtonGroup>
            </Popover>
        }
    >
        <Button appearance={"primary"} color={color}>{props.children}</Button>
    </Whisper>
}

export default React.memo(TableConformButton)
