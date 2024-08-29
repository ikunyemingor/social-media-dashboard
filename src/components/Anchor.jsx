import React, { useState, useEffect } from 'react';
import { LinkOutlined } from '@ant-design/icons';

const Anchor = ({ link }) => {
    return (
        <>
        <Anchor
            items={[
            {
                key: 'link-' + Date.now(),
                href: link,
                title: "",
            }
            ]}
        />
        </>
    );
};
export default Anchor;