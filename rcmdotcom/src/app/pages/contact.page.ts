import { Component } from '@angular/core'
import { FooterComponent } from '../../components/footer.component';

@Component({
    imports: [FooterComponent],
    template: `
    <div class="flex w-full min-h-screen justify-center items-center">
      <div
        class="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-primary-parchment w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white overflow-hidden"
      >
        <div class="flex flex-col space-y-8 justify-between">
          <div>
            <h1 class="font-bold text-4xl tracking-wide">Contact Me</h1>
            <p class="pt-2 text-indigo-100 text-sm">
              Whether you're interested in a collaboration, have an exciting project in mind, or
              just want to chat, I'm all ears! Feel free to drop me a message with your thoughts,
              ideas, or even just to say hello. I love connecting with people from all walks of
              life. Looking forward to connecting with you!
              <!-- TODO: add signature -->
            </p>
          </div>
          <div class="flex flex-col space-y-6">
            <div class="inline-flex space-x-2 items-center w-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-phone"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                ></path>
              </svg>
              <span>+111 345 214 213</span>
            </div>
            <div class="inline-flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-mail"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>hello&#64;ryanmartin.io</span>
            </div>
            <div class="inline-flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-map-pin"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Miami, Florida 🏖️</span>
            </div>
          </div>
          <div class="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/ryancraigmartin/"
              class="secondary-300 transition duration-300 hover:secondary-300"
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="h-6 w-6">
                <path
                  d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                ></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ryancraigmartin"
              class="secondary-300 rounded transition duration-300 hover:secondary-300"
              ><span class="sr-only">Instagram</span
              ><svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6">
                <path
                  fill-rule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clip-rule="evenodd"
                ></path></svg></a
            ><a
              href="https://www.twitter.com/ryancraigmartin"
              class="secondary-300 rounded transition duration-300 hover:secondary-300"
              ><span class="sr-only">Twitter</span
              ><svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6">
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                ></path></svg
            ></a>
            <a
              href="https://www.github.com/ryancraigmartin"
              class="secondary-300 rounded transition duration-300 hover:secondary-300"
              ><span class="sr-only">GitHub</span
              ><svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6">
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                ></path></svg
            ></a>
          </div>
        </div>
        <div class="relative">
          <div class="absolute z-0 w-40 h-40 bg-indigo-400 rounded-full -right-28 -top-28"></div>
          <div class="absolute z-0 w-40 h-40 bg-indigo-400 rounded-full -left-28 -bottom-16"></div>
          <div class="relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-80">
            <form class="flex flex-col space-y-4" action="">
              <div>
                <label for="" class="text-sm">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  class="ring-1 ring-gray-300 mt-2 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
              <div>
                <label for="" class="text-sm">Email</label>
                <input
                  type="email"
                  placeholder="jim.halpert@dundermifflin.com"
                  class="ring-1 ring-gray-300 mt-2 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
              <div>
                <label for="" class="text-sm">Message</label>
                <textarea
                  placeholder="Message"
                  rows="4"
                  class="ring-1 ring-gray-300 mt-2 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
                ></textarea>
              </div>
              <button
                class="inline-block self-end bg-indigo-600 font-bold rounded-lg px-6 py-4 uppercase text-sm text-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <rcmdotcom-footer />
  `
})
export default class ContactPage {
  // posts = injectContentFiles<BlogPost>()
}
