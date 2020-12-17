import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';

const getPatients = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): PublicPatient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientData.push(newPatient);

  const { ssn, ...publicPatient } = newPatient;
  return publicPatient;
};

const findById = (id: string): Patient | undefined => {
  return patientData.find((p) => p.id === id);
};

export default {
  getPatients,
  addPatient,
  findById,
};
