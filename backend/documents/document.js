module.exports = ({ requestId,
  department,
  date,
  contactPerson,
  contactNo,
  budgetAllocation,
  usedAmount,
  balanceAvailable,
  purpose,
  sendTo,
  items,
  files, }) => {
  return `
  <!DOCTYPE html>
  <html lang="en" class="antialiased">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>
        Tailwind Starter Template - Multi Section Form / Scrollspy: Tailwind
        Toolbox
      </title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
      />
      <link
        href="https://unpkg.com/@tailwindcss/custom-forms/dist/custom-forms.min.css"
        rel="stylesheet"
      />
      <!--Replace with your tailwind.css once created-->
      <style>
        .max-h-64 {
          max-height: 16rem;
        }
        /*Quick overrides of the form input as using the CDN version*/
        .form-input,
        .form-textarea,
        .form-select,
        .form-multiselect {
          background-color: white;
          border-color: black;
        }
      </style>
    </head>
  
    <body class="bg-gray-100 text-gray-900 tracking-wider leading-normal">
      <!--Container-->
      <div class="container w-full flex flex-wrap mx-auto px-2 pt-0">
        <div
          class="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal"
        ></div>
        <!--Section container-->
        <section class="w-full lg:w-4/5">
          <!--Card-->
          <div class="w-full container mx-auto justify-between my-4 ">
            <!-- Added relative positioning to maintain absolute position of child elements -->
            <div class="flex justify-between items-center mx-4 md:mx-0">
              <!-- Flex container to align the logo, text, and form -->
              <div class="flex items-center">
                <!-- Flex container to align the logo and text -->
                <a href="http://www.ruh.ac.lk">
                  <img
                    src="https://i.ibb.co/qpvr0B6/09-03-2024-11-31-07-REC.png"
                    alt="09-03-2024-11-31-07-REC"
                    border="0"
                  />
                </a>
              </div>
              <div class="absolute right-5 flex flex-col">
                <!-- Absolute positioning for the input container and set as a column -->
                <!-- Label for Date -->
                <label for="date" class="text-sm">Date:</label>
                <input
                  id="date"
                  class="form-input mb-0 h-8 focus:bg-white"
                  type="text"
                  value="${date}"
                  placeholder="Date"
                />
  
                <!-- Label for Form Number -->
                <label for="form-no" class="text-sm">Form No:</label>
                <input
                  id="form-no"
                  class="form-input mb-0 h-8 focus:bg-white"
                  type="text"
                  value="${requestId}"
                  placeholder="Form No"
                />
              </div>
            </div>
          </div>
  
          <!--/Card-->
  
          <!--divider-->
          <hr class="bg-gray-300 my-2" />
  
          <!--Title-->
          <h2
            class="font-sans font-bold break-normal text-gray-700 px-2 pb-0 text-lg"
          >
            User
          </h2>
  
          <!--Card-->
          <form>
            <div class="md:flex mb-0">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-600 text-sm font-bold md:text-left mb-0 md:mb-0 pr-4"
                  for="my-textfield"
                >
                  Faculty/Admin
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="form-input block w-full focus:bg-white h-8 px-3 py-1 text-sm"
                  id="my-textfield"
                  type="text"
                  value="${department}"
                />
              </div>
            </div>
  
            <div class="md:flex mb-0">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-600 text-sm font-bold md:text-left mb-0 md:mb-0 pr-4"
                  for="my-textfield"
                >
                  Department/Branch
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="form-input block w-full focus:bg-white h-8 px-3 py-1 text-sm"
                  id="my-textfield"
                  type="text"
                  value="${department}"
                />
              </div>
            </div>
  
            <div class="md:flex mb-0">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-600 text-sm font-bold md:text-left mb-0 md:mb-0 pr-4"
                  for="my-textfield"
                >
                  Contact Person
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="form-input block w-full focus:bg-white h-8 px-3 py-1 text-sm"
                  id="my-textfield"
                  type="text"
                  value="${contactPerson}"
                />
              </div>
            </div>
            <div class="md:flex mb-0">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-600 text-sm font-bold md:text-left mb-0 md:mb-0 pr-4"
                  for="my-textfield"
                >
                  Contact Number
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="form-input block w-full focus:bg-white h-8 px-3 py-1 text-sm"
                  id="my-textfield"
                  type="text"
                  value="${contactNo}"
                />
              </div>
            </div>
          </form>
          <!--/Card-->
  
          <!--divider-->
          <hr class="bg-gray-300 my-2" />
  
          <!--Title-->
          <h2
            class="font-sans font-bold break-normal text-gray-700 px-2 pb-2 text-lg"
          >
            Funds
          </h2>
  
          <!--Card-->
          <form>
            <div class="md:flex mb-1">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-600 text-sm font-bold md:text-left mb-0 md:mb-0 pr-4"
                  for="my-textfield"
                >
                  Budget Allocation Rs
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="form-input block w-full focus:bg-white h-8 px-3 py-1 text-sm"
                  id="my-textfield"
                  type="text"
                  value="${budgetAllocation}"
                />
              </div>
            </div>
  
            <div class="md:flex mb-1">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-600 text-sm font-bold md:text-left mb-0 md:mb-0 pr-4"
                  for="my-select"
                >
                  Used Amount So far Rs
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="form-input block w-full focus:bg-white h-8 px-3 py-1 text-sm"
                  id="my-textfield"
                  type="text"
                  value="${usedAmount}"
                />
              </div>
            </div>
  
            <div class="md:flex mb-1">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-600 text-sm font-bold md:text-left mb-0 md:mb-0 pr-4"
                  for="my-textfield"
                >
                  Balance Available Rs
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="form-input block w-full focus:bg-white h-8 px-3 py-1 text-sm"
                  id="my-textfield"
                  type="text"
                  value="${balanceAvailable}"
                />
              </div>
            </div>
          </form>
          <!--/Card-->
  
          <!--divider-->
          <hr class="bg-gray-300 my-2" />
  
          <!--Title-->
          <h2
            class="font-sans font-bold break-normal text-gray-700 px-2 pb-2 text-lg"
          >
            Object
          </h2>
  
          <!--Card-->
          <div class="flex flex-col">
            <div class="sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-4">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-2 border border-gray-300"
                          colspan="4"
                        ></th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px- py-2 border border-gray-300"
                          colspan="3"
                        >
                          To be filled by Supplies Division
                        </th>
                      </tr>
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-2 py-4 border border-gray-300 text-left"
                        >
                          Description of the items indented to be purchased
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-2 py-4 border border-gray-300 text-left"
                        >
                          Cost Approximately
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-2 py-4 border border-gray-300 text-left"
                        >
                          Qty Required
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-2 py-4 border border-gray-300 text-left"
                        >
                          Qty Already available
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-2 py-4 border border-gray-300 text-left"
                        >
                          Qty Supplied
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-2 py-4 border border-gray-300 text-left"
                        >
                          Rate
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-2 py-4 border border-gray-300 text-left"
                        >
                          Total value
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!--/Card-->
  
          <!--divider-->
          <hr class="bg-gray-300 my-4" />
  
          <!--Title-->
          <h2
            class="font-sans font-bold break-normal text-gray-700 px-2 pb-2 text-lg"
          >
            Purpose
          </h2>
          <ul
            class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg sm:flex dark:bg-gray-700 dark:text-white"
          >
            <li class="w-full">
              <div class="flex items-center">
                <input
                  id="vue-checkbox-1"
                  type="checkbox"
                  class="hidden"
                  checked
                />
                <label
                  for="vue-checkbox-1"
                  class="flex items-center cursor-pointer"
                >
                  <span class="w-5 h-5 rounded-full bg-green-500 mr-2"></span>
                  ${purpose}
                </label>
              </div>
            </li>
          </ul>
  
          <!--divider-->
          <hr class="bg-gray-300 my-4" />
  
          <!--Title-->
          <h2
            class="font-sans font-bold break-normal text-gray-700 px-2 pb-2 text-lg"
          >
            Submission
          </h2>
  
          <!--Card-->
          <form>
            <div class="md:flex mb-1">
              <div class="md:w-1/3">
                <label
                  class="block text-gray-600 text-sm font-bold md:text-left mb-0 md:mb-0 pr-4"
                  for="my-textfield"
                >
                  Send To
                </label>
              </div>
              <div class="md:w-2/3">
                <input
                  class="form-input block w-full focus:bg-white h-8 px-3 py-1 text-sm"
                  id="my-textfield"
                  type="text"
                  value="${sendTo}"
                />
              </div>
            </div>
          </form>
          <!--/Card-->
  
          <!--divider-->
          <hr class="bg-gray-300 my-4" />
  
          <!--Title-->
          <h2
            class="font-sans font-bold break-normal text-gray-700 px-2 pb-2 text-lg"
          >
            Attached Documents
          </h2>
  
          <!--Card-->
          <div class="flex flex-col">
            <div class="sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-4">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-2 py-4 border border-gray-300 text-left"
                        >
                          File Name
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-2 py-4 border border-gray-300 text-left"
                        >
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                    ${Array.isArray(files) ? files.map(
                      (file) => `
                        <tr>
                          <td
                            class="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300"
                          >
                            ${file.fileName}
                          </td>
                          <td
                            class="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300"
                          >
                            ${file.description}
                          </td>
                        </tr>
                      `
                    ).join('') : ''}
                  </tbody>
                  
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!--/Card-->
        </section>
        <!--/Section container-->
      </div>
      <!--/container-->
    </body>
  </html>
  `;
};