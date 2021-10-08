import React from 'react';
import {Modal, Uploader} from "rsuite";
import {logger, toast} from "../utils/functions";
import Upload from "@rsuite/icons/legacy/Upload";

const UploadImage = ({value, onChange, ...props}) =>{
    const [show, setShow] = React.useState(false);
    const [fileList, setFileList] = React.useState([]);

    React.useMemo(() => {
        setFileList([{id:1, fileKey: 1, url: value}]);
    }, [value]);


    return (
        <div>
            <Uploader
                name={'image'}
                accept={'image/*'}
                fileListVisible={false}
                listType="picture"
                fileList={fileList}
                onPreview={(file, e) => {
                    if (file.url) {
                        setShow(true);
                    }
                }}
                onSuccess={(res, file) => {
                    file.url = res.image;
                    setFileList([file]);
                    onChange(res.image);
                }}
                onRemove={(file) => {
                    setFileList([]);
                    onChange('');
                }}
                onError={() => {
                    toast('上传失败，网络错误', 'error');
                }}
                action={'/upload'}
            >
                <button type={'button'} style={{minHeight:  100, width: props.width || 100, height: props.height || 100}}>
                    {fileList[0] && fileList[0].url ? <img src={fileList[0].url} alt={"Image"} className={'object-cover w-full h-full'} /> : <Upload />}
                </button>
            </Uploader>
            <Modal
                backdrop={true}
                overflow={false}
                open={show}
                onClose={() => setShow(false)}
            >
                <Modal.Header><Modal.Title>预览</Modal.Title></Modal.Header>
                <Modal.Body>
                    <img src={fileList[0] && fileList[0].url} width={'100%'} alt={""}/>
                </Modal.Body>
            </Modal>
        </div>

    );
};

export default React.memo(UploadImage)
