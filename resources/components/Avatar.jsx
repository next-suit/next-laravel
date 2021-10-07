import React from 'react';
import {Avatar as AvatarRs, Button, Modal} from "rsuite";

const Avatar = (props) => {
    const [show ,setShow] = React.useState(false);

    return (
        <div>
            <AvatarRs src={props.src} circle={props.circle} className={props.src && 'cursor-pointer'} onClick={()=> props.src && setShow(true)} />


            <Modal
                backdrop={true}
                overflow={false}
                open={show}
                onClose={() => setShow(false)}
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
};

export default React.memo(Avatar);
