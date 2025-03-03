

import Layout from "../components/Layout";
import DynamicForm from "../components/DynamicForm";

export default function form2() {

    const fields = [
        { name: 'firstName', label: 'First Name', required: true },
        { name: 'lastName', label: 'Last Name', required: true },
        { name: 'email', label: 'Email', required: true, type: 'email' },
        { name: 'password', label: 'Password', required: true, type: 'password' },
      ];
  return (
    <Layout>
      <main id="main" className="main">
    <DynamicForm fields={fields}>

    </DynamicForm>
</main>

    </Layout>
  );
}
