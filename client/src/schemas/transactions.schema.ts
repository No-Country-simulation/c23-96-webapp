import * as yup from 'yup';

const transactionSchema = yup.object().shape({
  _id: yup.string().required('ID is required'),
  type: yup.string().required('Type is required'),
  moneyType: yup.string().required('Money type is required'),
  date: yup.string().required('Date is required'),
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  extra: yup.string().optional(),
  destinationAccount: yup.object().shape({
    _id: yup.string().required('Destination account ID is required'),
    cvu: yup.string().required('CVU is required'),
    balancePeso: yup.number().required('Balance in Peso is required').min(0, 'Balance in Peso cannot be negative'),
    balanceDolar: yup.number().required('Balance in Dollar is required').min(0, 'Balance in Dollar cannot be negative'),
    account: yup.string().required('Account is required'),
  }).optional(),
});



export default transactionSchema;
