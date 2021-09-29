import * as React from 'react';
import {Switch, Route, useHistory, useLocation, useParams} from 'react-router-dom';
import {
    Button,
    Form,
    Input, InputGroup,
    Modal, Radio,
    RadioGroup,
    Schema,
    SelectPicker
} from "rsuite";
import api from "../../../../utils/api";
import md5 from 'md5';

export default function Edit(props){
    const [submitLoading, setSubmitLoading] = React.useState(false)
    const [formValues, setFormValues] = React.useState({group_id: '', name: '', mobile: '', password: '', status: 1})
    const [groups, setGroups] = React.useState([])
    const formRef = React.useRef(null)
    const focusRef = React.useRef(null)
    const history = useHistory();
    const params = useParams();

    React.useEffect(() => {
        focusRef.current.focus();
        init();
    }, []);

    async function init() {
        let res = await api.get('/permission/user/' + params.id)
        setFormValues({...res.data, password: ''})
        setGroups(res.groups)
    }

    async function submit() {
        await api.post('/permission/user', formValues)
    }

    return (
        <div>
            <Form fluid
                  ref={formRef}
                  model={Schema.Model({
                      group_id: Schema.Types.NumberType().isRequired('必填').isInteger('必须为整数'),
                      name: Schema.Types.StringType().isRequired('必填').minLength(3, '最少为3个字符'),
                      mobile: Schema.Types.NumberType(),
                      password: Schema.Types.StringType(),
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
                          history.goBack();
                      }catch (e) {

                      }
                      setSubmitLoading(false);
                  }}
            >
                <Form.Group>
                    <Form.ControlLabel>分组名</Form.ControlLabel>
                    <Form.Control block accepter={SelectPicker} data={groups} labelKey={'name'} valueKey={'id'} name={'group_id'} autoComplete={'off'} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>用户名</Form.ControlLabel>
                    <Form.Control inputRef={focusRef} name={'name'} autoComplete={'off'} />
                </Form.Group>
                {/*<FormGroup>
                    <ControlLabel>手机号</ControlLabel>
                    <FormControl accepter={Input} name={'mobile'} autoComplete={'off'} />
                </FormGroup>*/}
              <Form.Group>
                <Form.ControlLabel>登录密码</Form.ControlLabel>
                <InputGroup style={{width: '100%'}}>
                  <Form.Control accepter={Input} type={'text'} placeholder={'不修改则不必填写'} name={'password'} autoComplete={'off'} />
                  <InputGroup.Button onClick={() => {
                    let formValues2 = {...formValues};
                    formValues2.password = md5(Math.random());
                    setFormValues(formValues2);
                  }}>随机密码</InputGroup.Button>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>补单密码</Form.ControlLabel>
                <InputGroup style={{width: '100%'}}>
                  <Form.Control accepter={Input} type={'text'} placeholder={'不修改则不必填写'} name={'order_resolve_password'} autoComplete={'off'} />
                  <InputGroup.Button onClick={() => {
                    let formValues2 = {...formValues};
                    formValues2.password = md5(Math.random());
                    setFormValues(formValues2);
                  }}>随机密码</InputGroup.Button>
                </InputGroup>
              </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>备注</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'remarks'} autoComplete={'off'} />
                </Form.Group>
                <Form.Group controlId={'status'}>
                    <Form.ControlLabel>状态</Form.ControlLabel>
                    <Form.Control accepter={RadioGroup} name={'status'} inline>
                        {['禁用','启用'].map((status, val) =>
                            <Radio key={status} value={val}>{status}</Radio>
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Button appearance="primary" type={'submit'} disabled={submitLoading} loading={submitLoading}>提交</Button>
                    <Button onClick={() => history.goBack()} appearance="subtle">取消</Button>
                </Form.Group>
            </Form>
        </div>
    );
}
