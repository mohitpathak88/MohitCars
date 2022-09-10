import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { FrownOutlined } from '@ant-design/icons';

function NoAdminExcess() {
    return (
        <DefaultLayout>
            <h2 className='mt-4'> You dont have admin excess!</h2>
            <FrownOutlined className='mt-7'/>
        </DefaultLayout>
    )
}

export default NoAdminExcess;