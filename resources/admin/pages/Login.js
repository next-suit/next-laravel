import * as React from 'react'
import {Button, ButtonGroup, Form, Input, Panel} from "rsuite";
import {useHistory} from 'react-router-dom'
import api from "../../utils/api";

export default props => {
    const [formValue, setFormValue] = React.useState({name: '', password: '', code: ''});
    const [loading, setLoading] = React.useState(false);
    const [pathname, setPathname] = React.useState(window.location.pathname.replace(/\//g, '_'));
    const focusRef = React.useRef(null);
    const history = useHistory();

    React.useEffect(() => {
        init();
        focusRef.current.focus();
    }, []);

    async function init(){
        localStorage.removeItem(`token${pathname}`);
        await api.post('/logout');
    }

    async function submit(){
        setLoading(true);
        try {
            let res = await api.post('/login', formValue);
            localStorage.setItem(`token${pathname}`, res.token);
            let jump = localStorage.getItem(`auth_jump${pathname}`);
            if(jump === '/login'){
                jump = '/';
            }
            history.push(jump);
        }catch (e) {

        }
        setLoading(false);
    }

    return (
        <div className={'login-bg h-screen w-screen'}>
            <div className={'login-dialog absolute bg-white shadow-xl'}>
                <Panel header={<h4>操作员登录</h4>} bordered shaded>
                    <Form
                        fluid
                        formValue={formValue}
                        onChange={setFormValue}
                        onSubmit={async ()=> {
                            await submit();
                        }}
                    >
                        <Form.Group>
                            <Form.ControlLabel>用户名</Form.ControlLabel>
                            <Form.Control inputRef={focusRef} accepter={Input} name={'name'} placeholder={'用户名'} autoComplete={'off'} />
                        </Form.Group>
                        <Form.Group>
                            <Form.ControlLabel>密码</Form.ControlLabel>
                            <Form.Control accepter={Input} type={'password'} name={'password'} placeholder={'登录密码'} autoComplete={'off'} />
                        </Form.Group>
                        {/*<FormGroup>
                            <ControlLabel>二步验证码，如未开启毋需输入</ControlLabel>
                            <FormControl accepter={Input} type={'number'} name={'authenticator_secret'} placeholder={'6位数字验证码'} autoComplete={'off'} />
                        </FormGroup>*/}
                        <Form.Group className={'flex justify-end'}>
                            <ButtonGroup>
                                <Button disabled={loading} appearance={'primary'} type={'submit'}>登 录</Button>
                            </ButtonGroup>
                        </Form.Group>
                    </Form>
                </Panel>
            </div>
        </div>
    );
}
