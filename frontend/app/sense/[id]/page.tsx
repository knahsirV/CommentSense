const page = ({ params }: { params: { id: string } }) => {
  return <main>{params.id}</main>;
};

export default page;
