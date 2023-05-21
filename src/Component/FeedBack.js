import { Button, Result } from 'antd';
import React from 'react';

const FeedBack=(props) => {

        return(
            <Result
                status={props.status}
                title={props.title}
                subTitle={props.help}
                extra={[
                    <Button type="primary"  onClick={props.function}>
                        继续
                    </Button>
                ]}
            />
        )

};

export default FeedBack;