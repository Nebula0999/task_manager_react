import React from 'react'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function AddTaskForm() {
  const [newTask, setNewTask] = useState(
    [
        'name: "Task 1",',
        'description: "Description for Task 1",',
        'status: "To Do",',
    ]
);

return (
  <div className='p-4 m-4 bg-purple-400 rounded border-blue-400 py-2 font-serif justify-center items-center mx-auto w-full'>
    <div>
      <h1 className='text-blue-700 text-center text-2xl font-semibold bg-slate-400 p-2 rounded'>Sign Up</h1>
        <div className="flex flex-col gap-2">
          <Formik
            initialValues={{
              username: '',
              firstName: '',
              lastName: '',
              email: '',
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form className='flex flex-col mx-8 p-5 justify-center items-center gap-3'>
              <label htmlFor="firstName" className='text-blue-600 font-bold text-xl'>First Name</label>
              <Field id="firstName" name="firstName" placeholder="Jane" className='p-2 rounded w-60' />

              <label htmlFor="lastName" className='text-blue-600 font-bold text-xl'>Last Name</label>
              <Field id="lastName" name="lastName" placeholder="Doe" className='p-2 rounded w-60'/>

              <label htmlFor="username" className='text-blue-600 font-bold text-xl'>Username</label>
              <Field id="username" name="username" placeholder="user101" className='p-2 rounded w-60'></Field>

              <label htmlFor="email" className='text-blue-600 font-bold text-xl'>Email</label>
              <Field
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
                className='p-2 rounded w-60'
              />
              <button type="submit" className='bg-green-500 font-bold border-1 rounded text-black p-2 hover:bg-green-600'>Submit</button>
            </Form>
          </Formik>
        </div>
    </div>
  </div>
)
}
export default AddTaskForm;