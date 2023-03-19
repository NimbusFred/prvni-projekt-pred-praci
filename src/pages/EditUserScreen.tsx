import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthProvider';
import { httpGet, httpPost } from '../utils/http-client';

interface User {
    username: string;
    firstName: string;
    lastName: string;
    role: string;
}
/**
 * Komponenta představující stránku editace uživatele
 * [pouze přihlášený uživatel]
 */

export default function EditUserScreen() {
    const { id } = useParams();
    const [user, setUser] = useState<Array<User>>([]);

    console.log("ahoj user.map(uzivatel => (
        uzivatel.firstName
    )));


    const validationSchema = Yup.object().shape({
        id: Yup.string().required('ID is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        username: Yup.string().required('username is required'),
        role: Yup.string().required('role is required'),
    });

    const handleSubmit = async (values: User) => {
        const res = await httpGet('users/$');
    };

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
        <div className="min-h-screen bg-gray-100">
            <div className="py-12 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Edit User</h2>
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full pl-4 pr-4 pb-4 pt-4">
                        <Formik initialValues={{
                            username: '',
                            firstName: '',
                            lastName: '',
                            role: '',
                        }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form>
                                    {user.map(uzivatel => (

                                        <>
                                            <div className="mb-4" >
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="id">
                                                    ID
                                                </label>
                                                <Field
                                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    name="id"
                                                    placeholder="id"
                                                    disabled
                                                    value={id}
                                                />
                                                <ErrorMessage name="id" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                                    First Name
                                                </label>
                                                <Field
                                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="Enter first name"
                                                />
                                                <ErrorMessage name="firstName" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                                    Last Name
                                                </label>
                                                <Field
                                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Enter last name"
                                                />
                                                <ErrorMessage name="lastName" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                                    Username
                                                </label>
                                                <Field
                                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    name="username"
                                                    placeholder="Enter username"
                                                />
                                                <ErrorMessage name="username" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                                                    role
                                                </label>
                                                <Field
                                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    name="role"
                                                    placeholder="Enter role"
                                                />
                                                <ErrorMessage name="role" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Save Changes
                                            </button>
                                        </>
                                    ))}

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div >
    );
}