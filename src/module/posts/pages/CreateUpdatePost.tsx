import { Form } from "../components/Form";

interface Post {
  id?: string;
}

function CreateUpdatePostPage(props: Post) {
  return <Form id={props.id} />;
}

export default CreateUpdatePostPage;
