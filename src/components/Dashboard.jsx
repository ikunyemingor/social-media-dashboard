// Dashboard layout for displaying social media analytics.
import React, { useState, useEffect } from 'react';
import { Flex, Switch, Space, Spin, Alert } from 'antd';
import {
    TwitterSquareFilled,
    FacebookFilled,
    InstagramFilled,
    LoadingOutlined
  } from '@ant-design/icons';
import SocialCard from './SocialCard';

// Sample API data
const mockApiData = {
  twitter: { followers: 1200, likes: 300 },
  facebook: { followers: 900, likes: 450 },
  instagram: { followers: 1500, likes: 750 },
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      // Placeholder for API call here:
      // const response = await fetch('API_ENDPOINT');
      // const data = await response.json();
      
      // Using mock data for demonstration
      setAnalyticsData(mockApiData);
    };

    fetchData();
  }, []);

  // Show spinner while loading data.
  if (!analyticsData) {
    return <div>
            <Flex align="center" gap="middle">
                <Spin
                indicator={
                    <LoadingOutlined spin size="large" />
                }
                >
                    <Alert
                        message=""
                        description="Loading social media analytics... Please wait"
                        type="info"
                    />
                </Spin>
            </Flex>
        </div>
    ;
  }

  return (
    <Flex gap="middle" align="start" vertical>
        <Space
            direction="horizontal"
            size="middle"
            style={{
            width: '100%',
            }}
        >
            <Switch checked={!loading} onChange={(checked) => setLoading(!checked)} />
            <p>Display/hide your social media metrics.</p>
        </Space>
        <Space
            direction="vertical"
            size="middle"
            style={{
            width: '100%',
            }}
        >
            <SocialCard
                platform="Twitter"
                icon={<TwitterSquareFilled
                    style={{ fontSize: '60px', color: '#1d9bf0' }} />}
                followers={analyticsData.twitter.followers}
                likes={analyticsData.twitter.likes}
                loading={loading}
                handle="@ikun"
                handleColor="#1d9bf0"
            />
            <SocialCard
                platform="Facebook"
                icon={<FacebookFilled
                    style={{ fontSize: '60px', color: '#3b5998' }} />}
                followers={analyticsData.facebook.followers}
                likes={analyticsData.facebook.likes}
                loading={loading}
                handle="@yemi"
                handleColor="#3b5998"
            />
            <SocialCard
                platform="Instagram"
                icon={<InstagramFilled
                    style={{ fontSize: '60px', color: '#0095f6' }} />}
                followers={analyticsData.instagram.followers}
                likes={analyticsData.instagram.likes}
                loading={loading}
                handle="@ikunyemi"
                handleColor="#0095f6"
            />
      </Space>
    </Flex>
  );
};

export default Dashboard;
