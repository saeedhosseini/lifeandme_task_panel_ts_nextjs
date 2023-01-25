import {Inter} from '@next/font/google'
import {ColumnsType} from "antd/es/table";
import {User, UserModelFromJson} from "@/app/models/User";
import {Button, Modal, Popover, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {indexUser, removeUser} from "@/app/repositories/UserRepository";
import AddModalUser from "@/components/User/AddModal";
import EditModalUser from "@/components/User/EditModal";

const inter = Inter({subsets: ['latin']})

export default function Home() {

    const [page, setPage] = useState<number>(1);
    const [totalItem, setTotalItem] = useState<number>(0);
    const [users, setUsers] = useState<Array<User> | null>(null);

    const [deleteUser, setDeleteUser] = useState<number>(0);
    const [editUser, setEditUser] = useState<User|null>(null);

    const [addNewUser, setAddNewUser] = useState<boolean>(false);

    const columns: ColumnsType<User> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'نام',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'تاریخ تولد',
            dataIndex: 'birthDay',
            key: 'birth_day',
            render: (date) => <span>{date.toDateString()}</span>,
        },
        {
            title: 'سن',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'ایمیل',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'عملیات',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={()=> setEditUser(record)}>ویراش </a>
                    <Popover
                        content={<a onClick={deleteUserClick}>بله</a>}
                        title="Title"
                        trigger="click"
                        open={deleteUser == record.id}
                        onOpenChange={(open) => {
                            setDeleteUser(open ? record.id : 0);
                        }}
                    > <a>حذف</a></Popover>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getUsers();
    }, [page])

    const getUsers = async () => {
        const paginationResult = await indexUser(page);
        setUsers(paginationResult.data.map(UserModelFromJson));
        setTotalItem(paginationResult.meta.total);
    }

    const addUserClick = () => {
        setAddNewUser(true);
    }


    const addOrUpdateOnFinish = (isUpdate:boolean) => {
        setAddNewUser(false)
        setEditUser(null)
        if (isUpdate){
            setUsers(null);
            getUsers();
        }
    }

    const deleteUserClick = async () => {
        await removeUser(deleteUser);
        setUsers(null);
        getUsers();
    }

    const onChangePage = (pageNumber: number, pageSize: number) => {
        //start loading
        setUsers(null);
        //fetch data
        setPage(pageNumber);
    }

    return (
        <>
            <Modal title="اضافه کردن کاربر"
                   open={addNewUser} footer={null} onCancel={()=> setAddNewUser(false)}>
            <AddModalUser onFinish={addOrUpdateOnFinish}/>
            </Modal>

            <Modal title="ویرایش کردن کاربر"
                   open={editUser != null} footer={null} onCancel={()=> setEditUser(null)}>
                <EditModalUser onFinish={addOrUpdateOnFinish} initUser={editUser!}/>
            </Modal>

            <div>
                <Button onClick={addUserClick}>اضافه کردن کاربر</Button>
                <Table columns={columns}
                       pagination={{
                           position: ['bottomRight'],
                           current: page,
                           onChange: onChangePage,
                           total : totalItem
                       }}
                       loading={users == null}
                       dataSource={users ?? []}/>
            </div>
        </>
    )
}
