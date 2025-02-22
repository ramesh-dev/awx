import React, { useState } from 'react';
import { Card, PageSection } from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';

import { CardBody } from 'components/Card';
import { InstanceGroupsAPI } from 'api';
import InstanceGroupForm from '../shared/InstanceGroupForm';

function InstanceGroupAdd({ defaultExecution, defaultControlPlane }) {
  const history = useHistory();
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const { data: response } = await InstanceGroupsAPI.create(values);
      history.push(`/instance_groups/${response.id}/details`);
    } catch (error) {
      setSubmitError(error);
    }
  };

  const handleCancel = () => {
    history.push(`/instance_groups`);
  };

  return (
    <PageSection>
      <Card>
        <CardBody>
          <InstanceGroupForm
            defaultControlPlane={defaultControlPlane}
            defaultExecution={defaultExecution}
            onSubmit={handleSubmit}
            submitError={submitError}
            onCancel={handleCancel}
          />
        </CardBody>
      </Card>
    </PageSection>
  );
}

export default InstanceGroupAdd;
