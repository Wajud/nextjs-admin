const page = () => {
  const handleForm = async (formData) => {
    "use server";
    console.log(formData);
    console.log("Hello");
  };

  return (
    <div>
      <form action={handleForm}>
        <input type="text" name="content" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default page;
