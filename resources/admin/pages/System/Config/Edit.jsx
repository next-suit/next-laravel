import * as React from 'react';
import {Switch, Route, useHistory, useLocation, useParams} from 'react-router-dom';
import {
    Button,
    DatePicker, Form,
    Input,
    Radio,
    RadioGroup,
    Schema,
    SelectPicker
} from "rsuite";
import api from "../../../../utils/api";
import {date, datetime, logger} from "../../../../utils/functions";

export default function Edit(props){
    const [submitLoading, setSubmitLoading] = React.useState(false);
    const [formValues, setFormValues] = React.useState({key: '', type: '', value: '', tips: ''});
    const [types, setTypes] = React.useState([]);
    const formRef = React.useRef(null);
    const focusRef = React.useRef(null);
    const history = useHistory();
    const params = useParams();

    React.useEffect(() => {
        focusRef.current.focus();
        init();
    }, []);

    async function init() {
        let res = await api.get('/system/config/' + params.id);
        let data = res.data || {};
        if(data.type === 'date' || data.type === 'datetime'){
            data.value = new Date(data.value);
        }
        setFormValues(data);
        setTypes(res.types);
    }

    async function submit() {
        let res = {...formValues};
        if(res.type === 'date'){
            res.value = date(res.value);
        }
        if(res.type === 'datetime'){
            res.value = datetime(res.value);
        }
        await api.post('/system/config', res)
    }

    return (
        <div>
            <Form fluid
                  ref={formRef}
                  model={Schema.Model({
                      key: Schema.Types.StringType().isRequired(),
                      type: Schema.Types.StringType().isRequired('请选择配置值类型'),
                      tips: Schema.Types.StringType().isRequired('请输入提示文案'),
                  })}
                  onChange={res => {
                      if(res.type === 'date' || res.type === 'datetime'){
                          res.value = new Date(res.value || new Date());
                      }
                      setFormValues(res)
                  }}
                  formValue={formValues}      // 初始值设置
                  onSubmit={async (e) => {
                      // e.preventDefault()
                      if (!formRef.current.check()) {
                          return false
                      }
                      setSubmitLoading(true);
                      try {
                          await submit();
                          history.goBack();
                      } catch (e) {

                      }
                      setSubmitLoading(false)
                  }}
            >
                <Form.Group>
                    <Form.ControlLabel>配置键名</Form.ControlLabel>
                    <Form.Control inputRef={focusRef} name={'key'} autoComplete={'off'}/>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>配置值类型</Form.ControlLabel>
                    <Form.Control block accepter={SelectPicker} data={types} name={'type'} autoComplete={'off'} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>配置值</Form.ControlLabel>
                    {formValues.type === 'onoff' ?
                        <Form.Control accepter={RadioGroup} name={'value'} inline>
                            {['开启', '关闭'].map((status, val) =>
                                <Radio key={status} value={val+''}>{status}</Radio>
                            )}
                        </Form.Control>
                        :
                        formValues.type === 'number' ?
                            <Form.Control accepter={Input} type={'number'} name={'value'} autoComplete={'off'} />
                            :
                            formValues.type === 'date' ?
                                <Form.Control accepter={DatePicker} format={'yyyy-MM-dd'} name={'value'} oneTap block autoComplete={'off'} />
                                :
                                formValues.type === 'datetime' ?
                                    <Form.Control accepter={DatePicker} format={'yyyy-MM-dd HH:mm:ss'} name={'value'} block autoComplete={'off'} />
                                    :
                                    <Form.Control accepter={Input} name={'value'} autoComplete={'off'}/>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>提示信息</Form.ControlLabel>
                    <Form.Control name={'tips'} autoComplete={'off'}/>
                </Form.Group>
                <Form.Group>
                    <Button appearance="primary" type={'submit'} disabled={submitLoading} loading={submitLoading}>提交</Button>
                    <Button onClick={() => history.goBack()} appearance="subtle">返回</Button>
                </Form.Group>
            </Form>
        </div>
    );
}
