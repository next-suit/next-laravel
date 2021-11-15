import React from 'react'
import {Button, ButtonGroup, ButtonToolbar, Form, Input, Panel} from "rsuite";
import {useHistory} from 'react-router-dom'
import api from "../../utils/api";
import {PATHNAME} from "../../utils/const";

export default props => {
    const [formValue, setFormValue] = React.useState({name: '', password: '', code: ''});
    const [loading, setLoading] = React.useState(false);
    const focusRef = React.useRef(null);
    const history = useHistory();

    React.useEffect(() => {
        init();
        focusRef.current.focus();
    }, []);

    async function init(){
        localStorage.removeItem(`token_${PATHNAME}`);
        await api.post('/logout');
    }

    async function submit(){
        setLoading(true);
        try {
            let res = await api.post('/login', formValue);
            localStorage.setItem(`token_${PATHNAME}`, res.token);
            history.push('/');
        }catch (e) {

        }
        setLoading(false);
    }

    return (
        <div className={'login-bg h-screen w-screen relative'}>
            <div className={'login-dialog absolute shadow-xl'}>
                <div className={'flex h-full relative'}>
                    <div className={'w-3/5 h-full'} />
                    <div className={'w-2/5 h-full'}>
                        <Panel className={'h-full pt-8 backdrop-filter backdrop-blur-xl backdrop-saturate-150'} header={<h4 className={'border-l-4 border-0 border-solid border-l-primary pl-2 text-gray-700'}>操作员登录 :)</h4>}>
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
                                <Form.Control inputRef={focusRef} accepter={Input} name={'name'} placeholder={'用户名'} autoComplete={'off'} size={'lg'} />
                            </Form.Group>
                            <Form.Group>
                                <Form.ControlLabel>密码</Form.ControlLabel>
                                <Form.Control accepter={Input} type={'password'} name={'password'} placeholder={'登录密码'} autoComplete={'off'} size={'lg'} />
                            </Form.Group>
                            {/*<FormGroup>
                                <ControlLabel>二步验证码，如未开启毋需输入</ControlLabel>
                                <FormControl accepter={Input} type={'number'} name={'authenticator_secret'} placeholder={'6位数字验证码'} autoComplete={'off'} />
                            </FormGroup>*/}
                            <Form.Group>
                                <Button block={true} size={"lg"} disabled={loading} appearance={'primary'} type={'submit'}>登 录</Button>
                            </Form.Group>
                        </Form>
                    </Panel>
                    </div>
                    <div className={'absolute bottom-20 -right-12 transform rotate-6 card-1'} />
                    <div className={'absolute -bottom-10 right-40 transform rotate-45 card-2'} />
                    <div className={'absolute -top-16 left-80 transform -rotate-12 card-3'} />
                    <div className={'absolute top-10 -right-10 transform rotate-12 card-4'} />
                </div>
            </div>

        </div>
    );
}
