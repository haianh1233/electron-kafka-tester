import { Tag } from 'antd';

export const auditType = {
    Cost: 'Cost',
    Governance: 'Governance',
    Security: 'Security',
    Performance: 'Performance',
    Good_Practice: 'Good Practice',
    Risk: 'Risk',
};

export const auditLabel = {
    Topic: 'Topic',
    Partition: 'Partition',
    Cluster: 'Cluster',
    Compression: 'Compression',
    Encryption: 'Encryption',
};

export const auditLevel = {
    High: 'High',
    Moderate: 'Moderate',
    Low: 'Low',
}

export const renderAuditTypes = (types) => {
    if (!Array.isArray(types)) return null;

    const sortedTypes = types.slice().sort((a, b) => a.localeCompare(b));

    return sortedTypes.map((type) => {
        let color = '';
        switch (type) {
            case auditType.Cost:
                color = 'magenta';
                break;
            case auditType.Governance:
                color = 'red';
                break;
            case auditType.Security:
                color = 'volcano';
                break;
            case auditType.Performance:
                color = 'orange';
                break;
            case auditType.Good_Practice:
                color = 'gold';
                break;
            case auditType.Risk:
                color = 'lime';
                break;
            default:
                color = 'green';
                break;
        }
        return (
            <Tag color={color} key={type}>
                {auditType[type] || type}
            </Tag>
        );
    });
};

export const renderAuditLabels = (labels) => {
    if (!Array.isArray(labels)) return null;

    const sortedLabels = labels.slice().sort((a, b) => a.localeCompare(b));

    return sortedLabels.map((label) => {
        let color = '';
        switch (label) {
            case auditLabel.Topic:
                color = 'magenta';
                break;
            case auditLabel.Partition:
                color = 'orange';
                break;
            case auditLabel.Cluster:
                color = 'gold';
                break;
            case auditLabel.Compression:
                color = 'lime';
                break;
            case auditLabel.Encryption:
                color = 'lime';
                break;
            default:
                color = 'green';
                break;
        }
        return (
            <Tag color={color} key={label}>
                {auditLabel[label] || label}
            </Tag>
        );
    });
};

export const renderAuditLevel = (level) => {
    let color = '';
    switch (level) {
        case auditLevel.High:
            color = 'red';
            break;
        case auditLevel.Moderate:
            color = 'orange';
            break;
        case auditLevel.Low:
            color = 'green';
            break;
    }
    return (
        <Tag color={color} key={level}>
            {auditLevel[level] || level}
        </Tag>
    );
}
