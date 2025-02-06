import * as Yup from 'yup';

const transactionSchema = Yup.object().shape({
  _id: Yup.string().required('ID is required'),
  type: Yup.string().required('Type is required'),
  moneyType: Yup.string().required('Money type is required'),
  date: Yup.string().required('Date is required'),
  amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
  extra: Yup.string().optional(),
  destinationAccount: Yup.object().shape({
    _id: Yup.string().required('Destination account ID is required'),
    cvu: Yup.string().required('CVU is required'),
    balancePeso: Yup.number().required('Balance in Peso is required').min(0, 'Balance in Peso cannot be negative'),
    balanceDolar: Yup.number().required('Balance in Dollar is required').min(0, 'Balance in Dollar cannot be negative'),
    account: Yup.string().required('Account is required'),
  }).optional(),
});

export default transactionSchema;
