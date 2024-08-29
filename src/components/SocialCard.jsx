// Card component for displaying social media analytics.
import React, { useState, useEffect } from 'react';
import { Card, Badge, Modal, Popconfirm } from 'antd';
import { LinkOutlined, SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import SettingsForm from './SettingsForm';

const SocialCard = ({ platform, handle, handleColor, icon, followers, likes, loading }) => {
    // Footer actions.
    const actions = [
      <Popconfirm
        title="See you soon"
        description={`Do you want to pen your ${platform} page?`}
        okText="Yes"
        cancelText="No"
        icon={
            <QuestionCircleOutlined
              style={{
                color: 'red',
              }}
            />
          }
        onConfirm={() => window.open("https://example.com", "_blank")}
        onOpenChange={() => console.log('open change')}
        >
            <LinkOutlined key="link" />
        </Popconfirm>,
      <SettingOutlined key="setting"
      onClick={() => {
        // Show confirm modal with settings form.
        Modal.confirm({
            centered: true,
            title: 'Update Settings for ' + platform,
            icon: <SettingOutlined
            style={{ fontSize: '30px', color: 'green' }} />,
            content: <SettingsForm title={platform} />,
            onOk() {
              return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
          });
      }} />,
    ];

  return (
    // Displaying social media analytics.
    <Badge.Ribbon text={handle} color={handleColor}>
        <Card
            loading={loading}
            actions={actions}
            hoverable={true}
            bordered={true}
            style={{
            minWidth: 300,
            }}
        >
            <Card.Meta
            avatar={icon}
            title={platform}
            description={
                <>
                <p>Followers: {followers}</p>
                <p>Likes: {likes}</p>
                </>
            }
            />
        </Card>
    </Badge.Ribbon>
  );
};

export default SocialCard;
