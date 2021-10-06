import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import customers from '../__mocks__/customers';
import { firebaseSearch } from 'src/utils/FirebaseUtil';
import { useEffect, useState } from 'react';

const CustomerList = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    findCustomers();
  }, []);

  const findCustomers = async () => {
    let result = await firebaseSearch('customers');
    setCustomers(result);
  }

  return <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>;
}

export default CustomerList;
