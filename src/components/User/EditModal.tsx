import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, InputNumber, Modal, Row} from 'antd';
import {User} from "@/app/models/User";
import {addUser, updateUser} from "@/app/repositories/UserRepository";

export type OnFinishModal = (isUpdate: boolean) => void;

export type AddModalUserProps = {
    onFinish: OnFinishModal,
    initUser: User
}

export default function EditModalUser(props: AddModalUserProps) {

    const [isLoading, setIsLoading] = useState(false);

    const onFinish = (values: User) => {
        //todo is fixed use the package and return date object
        values.birthDay = new Date(values.birthDay);
        values.id = props.initUser.id;
        setIsLoading(true);
        updateUser(values).then(_ => {
            setIsLoading(false);
            props.onFinish(true);
        })
    };

    const onCancel = () => {
        props.onFinish(false);
    }

    return (
        <>
            <div className={` w-full flex justify-center pt-[5vh]`}>
                <Form
                    name="updateUser"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="نام"
                        name="name"
                        initialValue={props.initUser.name}
                        rules={[{required: true, message: 'لطفا نام وارد کنید'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="ایمیل"
                        name="email"
                        initialValue={props.initUser.email}
                        rules={[{required: true, message: 'لطفا ایمیل وارد کنید'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="پسورد"
                        name="password"
                        rules={[{required: false, message: 'لطفا پسورد کامل کنید'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="تاریخ تولد"
                        name="birthDay"
                        help={"YYYY-MM-DD"}
                        initialValue={props.initUser.birthDay.getFullYear() +
                            '-' + props.initUser.birthDay.getMonth() +
                            '-' + props.initUser.birthDay.getDay()}
                        rules={[{required: true, message: 'تاریخ تولد خود وارد کنید'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="سن"
                        name="age"
                        initialValue={props.initUser.age}
                        rules={[{required: true, message: 'سن خود وارد کنید'}]}
                    >
                        <InputNumber/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Row>
                            <Button loading={isLoading} type="default" htmlType="submit">
                                ثبت
                            </Button>
                            <div style={{"width": "20px"}}></div>
                            <Button loading={isLoading} onClick={onCancel}>
                                بیخیال
                            </Button>
                        </Row>

                    </Form.Item>
                </Form>
            </div>
        </>
    );

};