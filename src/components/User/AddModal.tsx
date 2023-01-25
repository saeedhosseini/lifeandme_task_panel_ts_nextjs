import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, InputNumber, Modal, Row} from 'antd';
import {User} from "@/app/models/User";
import {addUser} from "@/app/repositories/UserRepository";

export type OnFinishModal = (isUpdate: boolean) => void;

export type AddModalUserProps = {
    onFinish : OnFinishModal
}

export default function AddModalUser(props : AddModalUserProps) {

    const [isLoading , setIsLoading] = useState(false);

    const onFinish = (values: User) => {
        //todo is fixed use the package and return date object
        values.birthDay = new Date(values.birthDay);
        setIsLoading(true);
        addUser(values).then(_ => {
            setIsLoading(false);
            props.onFinish(true);
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onCancel = ()=>{
        props.onFinish(false);
    }

    return (
        <>
            <div className={` w-full flex justify-center pt-[5vh]`}>
                <Form
                    name="addUser"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="نام"
                        name="name"
                        rules={[{required: true, message: 'لطفا نام وارد کنید'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="ایمیل"
                        name="email"
                        rules={[{required: true, message: 'لطفا ایمیل وارد کنید'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="پسورد"
                        name="password"
                        rules={[{required: true, message: 'لطفا پسورد کامل کنید'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="تاریخ تولد"
                        name="birthDay"
                        help={"YYYY-MM-DD"}
                        rules={[{required: true, message: 'تاریخ تولد خود وارد کنید'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="سن"
                        name="age"
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