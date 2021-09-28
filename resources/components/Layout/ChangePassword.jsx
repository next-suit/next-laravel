import React, {useEffect, useState, useRef, useCallback} from 'react'
import api from "../../utils/api"
import {useHistory} from 'react-router-dom'
import {
    Button,
    Form,
    Input,
    Modal,
    Schema
} from "rsuite"
import {logger, toastSuccess} from "../../utils/functions"

export default React.memo(function ChangePassword(props){
    const [formValues, setFormValues] = useState({
        old: '',
        new: '',
        new_confirmation: '',
    });
    const [submitLoading, setSubmitLoading] = useState(false)
    const history = useHistory();
    const formRef = useRef(null);
    const focusRef = useRef(null);

    async function submit(){
        await api.post('/password', formValues);
        toastSuccess('已成功修改密码，请使用新密码重新登陆');
        history.push('/login');
    }

    return (
        <Modal
            backdrop={true}
            overflow={true}
            onClose={() => props.onClose()}
            autoFocus
            open={props.open}
            onEnter={() => focusRef.current.focus()}
        >
            <Form fluid
                  ref={formRef}
                  model={Schema.Model({
                      old: Schema.Types.StringType().isRequired('该字段必填').minLength(6, '最少为6个字符'),
                      new: Schema.Types.StringType().isRequired('该字段必填').minLength(6, '最少为6个字符'),
                      new_confirmation: Schema.Types.StringType().isRequired('该字段必填').minLength(6, '最少为6个字符'),
                  })}
                  onChange={setFormValues}
                  formValue={formValues}      // 初始值设置
                  onSubmit={async (e) => {
                      // e.preventDefault()
                      if (!formRef.current.check()) {
                          return false
                      }
                      setSubmitLoading(true);
                      try {
                          await submit()
                          props.onClose()
                      }catch (e) {

                      }
                      setSubmitLoading(false);
                  }}
            >
                <Modal.Header><Modal.Title>修改密码</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.ControlLabel>旧密码</Form.ControlLabel>
                        <Form.Control accepter={Input} inputRef={focusRef} name={'old'} type={'password'} placeholder={'现登录密码'} autoComplete={'off'} />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>新密码</Form.ControlLabel>
                        <Form.Control accepter={Input} name={'new'} type={'password'} placeholder={'输入新登录密码'} autoComplete={'off'} />
                        <Form.HelpText><small>新密码长度不应少于6位数</small></Form.HelpText>
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>重复新密码</Form.ControlLabel>
                        <Form.Control accepter={Input} name={'new_confirmation'} type={'password'} placeholder={'确认新登录密码'} autoComplete={'off'} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" type={'submit'} disabled={submitLoading} loading={submitLoading}>提交</Button>
                    <Button onClick={() => props.onClose()} appearance="subtle">取消</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
})
