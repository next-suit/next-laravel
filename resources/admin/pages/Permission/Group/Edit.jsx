import React from 'react';
import {Switch, Route, useHistory, useLocation, useParams} from 'react-router-dom';
import api from "../../../../utils/api";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Form,
    Radio,
    RadioGroup,
    Schema
} from "rsuite";

export default function Edit(props){
    const [submitLoading, setSubmitLoading] = React.useState(false)
    const [formValues, setFormValues] = React.useState({name: '', menus: [], status: 1})
    const [menus, setMenus] = React.useState([])
    const history = useHistory();
    const params = useParams();
    const formRef = React.useRef(null)
    const focusRef = React.useRef(null)

    React.useEffect(() => {
        focusRef.current.focus();
        init();
    }, []);

    async function init() {
        let res = await api.get('/permission/group/' + params.id)
        setFormValues(res.data)
        setMenus(res.menus)
    }

    async function submit() {
        await api.post('/permission/group', formValues)
    }

    return (
        <div>
            <Form fluid
                  ref={formRef}
                  model={Schema.Model({
                      name: Schema.Types.StringType().isRequired('必填').minLength(1, '最少为1个字符'),
                      menus: Schema.Types.ArrayType(),
                      status: Schema.Types.NumberType().isRequired('必填'),
                  })}
                  onChange={formValues => setFormValues(formValues)}
                  formValue={formValues}      // 初始值设置
                  onSubmit={async (e) => {
                      // e.preventDefault()
                      if (!formRef.current.check()) {
                          return false
                      }
                      setSubmitLoading(true)
                      try {
                          await submit()
                          history.goBack();
                      } catch (e) {

                      }
                      setSubmitLoading(false)
                  }}
            >
                <Form.Group>
                    <Form.ControlLabel>分组名</Form.ControlLabel>
                    <Form.Control inputRef={focusRef} name={'name'} autoComplete={'off'}/>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>权限菜单</Form.ControlLabel>
                    <div className={'border-l-4'}>
                        {menus.map(parent =>
                            parent.children.length > 0 ? <div key={parent.name} className={'pl-2'}>
                                <h6>{parent.name}</h6>
                                <div className={'pl-4'}>
                                    <Form.Control accepter={CheckboxGroup} name={'menus'} inline>
                                        {parent.children.map(menu =>
                                            <Checkbox key={menu.url} value={menu.url}>{menu.name}</Checkbox>
                                        )}
                                    </Form.Control>
                                </div>
                            </div>: <div>
                                <Checkbox key={parent.url} value={parent.url}>{parent.name}</Checkbox>
                            </div>
                        )}

                    </div>
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
