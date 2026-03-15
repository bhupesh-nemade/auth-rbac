export default function EmailVerification(){

  return(

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg w-420px text-center">

        <h2 className="text-2xl font-bold mb-4">
          Verify Your Email
        </h2>

        <p className="text-gray-600 mb-6">
          A verification link has been sent to your email.
          Please check your inbox and click the link to verify your account.
        </p>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Resend Email
        </button>

      </div>

    </div>

  );

}