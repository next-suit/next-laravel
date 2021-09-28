import React from 'react';
import {Avatar, Button, Modal} from "rsuite";

export default React.memo(function Avatar(props){
    const [show ,setShow] = React.useState(false);

    return (
        <div>
            <Avatar src={props.src} circle={props.circle} className={props.src && 'cursor-pointer'} onClick={()=> setShow(true)} />


            <Modal
                backdrop={true}
                overflow={false}
                show={!!props.src && show}
                onHide={() => setShow(false)}
            >
                <Modal.Header><Modal.Title>预览</Modal.Title></Modal.Header>
                <Modal.Body>
                    <img src={props.src} width={'100%'}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)} appearance="subtle">关闭</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
})
