import Image from 'next/image';

const ProfilePage = () => {
  return (
    <div className="md:w-1/2 flex flex-col justify-start items-center">
      <div className='flex justify-center items-center my-16'>
        <Image
            width={500}
            height={500}
            className="rounded-full w-64 h-64 object-center object-cover"
            src="/test.jpg"
        />
      </div>
      <div className='w-full md:w-2/3 my-2'>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input type="text" name='username' value={"John Doe"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-orange focus:border-custom-orange block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div className='w-full md:w-2/3 my-2'>
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
          <input type="text" name='email' value={"john@doe.com"} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-orange focus:border-custom-orange block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
      <div className="w-full md:w-2/3 my-4">
      <button type="button" className="text-white border-2 border-custom-orange bg-custom-orange hover:bg-[#FF6200] transition hover:border-black focus:outline-none focus:ring-4 focus:ring-[#FFBB99] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Edit</button>
      </div>
    </div>
  )
}

export default ProfilePage