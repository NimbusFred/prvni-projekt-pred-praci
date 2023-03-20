import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthProvider';
import { httpGet, httpPost } from '../utils/http-client';
import Layout from '../components/layout/AuthLayout';
import FormLayout from '../components/layout/FormLayout';

interface User {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
}

export default function EditUserScreen() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User>();

    const validationSchema = Yup.object().shape({
        id: Yup.string().required('ID is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        username: Yup.string().required('username is required'),
        role: Yup.string().required('role is required'),
    });

    const handleSubmit = async (values: User) => {
        try {
            const res = await httpPost(`users/${id}`, values);
            if (res.status === 200) {
                console.log(res.data.payload);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        const res = await httpGet(`users/${id}`);
        if (res.status === 200) {
            setUser(res.data.payload);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100">
                {user ? (
                    <div className="py-12 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Edit User</h2>
                        <div className="max-w-7xl mx-auto ">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden w-full pl-4 pr-4 pb-4 pt-4">
                                <Formik initialValues={{
                                    id: id,
                                    username: user.username,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    role: user.role,
                                }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                    {({ isSubmitting, errors, touched }) => (
                                        <Form>
                                            <div className="mb-4" >
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="id">
                                                    ID
                                                </label>
                                                <FormLayout type='text' name='id' placeholder='id' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled />
                                                <ErrorMessage name="id" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <FormLayout type='text' name='firstName' placeholder='Enter first name' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                                                    Last Name
                                                </label>
                                                <FormLayout type='text' name='lastName' placeholder='Enter last name' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                                    Username
                                                </label>
                                                <FormLayout type='text' name='username' placeholder='Enter username' errors={errors} touched={touched} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                                <ErrorMessage name="username" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
                                                    role
                                                </label>
                                                <Field
                                                    as="select"
                                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    name="role"
                                                >
                                                    <option value="Admin">Admin</option>
                                                    <option value="ghost">ghost</option>
                                                    <option value="technician">technician</option>
                                                    <option value="asset">asset</option>
                                                    <option value="manager">manager</option>
                                                </Field>
                                                <ErrorMessage name="role" component="div" className="text-red-500 mt-1" />
                                            </div>

                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Save Changes
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </Layout>
    );
}
