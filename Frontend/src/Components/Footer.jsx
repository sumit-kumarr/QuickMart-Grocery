import React from "react";
import { Link, NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="text-text-muted pt-8 px-6 md:px-16 lg:px-24 xl:px-32 mt-20 bg-secondary">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <img
            src="logoo.png"
            alt="logo"
            className="mb-4 h-8 md:h-9"
          />
          <p className="text-sm text-text-secondary leading-relaxed">
            "QuickMart – Your groceries delivered in minutes, so you never miss
            a moment." "From farm-fresh veggies to daily essentials, everything
            at your doorstep instantly." "Why wait in long queues? Shop smarter,
            faster, and easier with QuickMart." "Freshness, speed, and
            convenience – that's the QuickMart promise." "Groceries made easy –
            because your time matters." "QuickMart – Turning everyday shopping
            into a hassle-free experience."
          </p>
          <div className="flex items-center gap-3 mt-4">
            {/* Instagram */}
            <svg className="w-6 h-6 text-text-muted hover:text-accent-color transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75A3.25 3.25 0 017.75 4.5h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5zm9.5 1a4 4 0 11-4 4 4 4 0 014-4zm0 1.5a2.5 2.5 0 102.5 2.5 2.5 2.5 0 00-2.5-2.5zm3.5-.75a.75.75 0 11.75-.75.75.75 0 01-.75.75z" />
            </svg>
            {/* Facebook */}
            <svg className="w-6 h-6 text-text-muted hover:text-accent-color transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.5 9H15V6.5h-1.5c-1.933 0-3.5 1.567-3.5 3.5v1.5H8v3h2.5V21h3v-7.5H16l.5-3h-3z" />
            </svg>
            {/* Twitter */}
            <svg className="w-6 h-6 text-text-muted hover:text-accent-color transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 5.92a8.2 8.2 0 01-2.36.65A4.1 4.1 0 0021.4 4a8.27 8.27 0 01-2.6 1A4.14 4.14 0 0016 4a4.15 4.15 0 00-4.15 4.15c0 .32.04.64.1.94a11.75 11.75 0 01-8.52-4.32 4.14 4.14 0 001.29 5.54A4.1 4.1 0 013 10v.05a4.15 4.15 0 003.33 4.07 4.12 4.12 0 01-1.87.07 4.16 4.16 0 003.88 2.89A8.33 8.33 0 012 19.56a11.72 11.72 0 006.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.18 8.18 0 0022 5.92z" />
            </svg>
            {/* LinkedIn */}
            <svg className="w-6 h-6 text-text-muted hover:text-accent-color transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3 8.75h3.96V21H3V8.75zm6.25 0h3.8v1.68h.05c.53-.98 1.82-2.02 3.75-2.02 4.01 0 4.75 2.64 4.75 6.07V21H17v-5.63c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.25V8.75z" />
            </svg>
          </div>
        </div>

        <div>
          <p className="text-lg text-primary font-semibold">Support</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <NavLink to="/about" className="hover:text-accent-color transition-colors">About</NavLink>
            <li>
              <a href="#" className="hover:text-accent-color transition-colors">Careers</a>
            </li>
            <li>
              <a href="#" className="hover:text-accent-color transition-colors">Press</a>
            </li>
            <li>
              <a href="#" className="hover:text-accent-color transition-colors">Blog</a>
            </li>
            <li>
              <a href="#" className="hover:text-accent-color transition-colors">Partners</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg text-primary font-semibold">Quick Mart</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link to = "/products" className="hover:text-blue-500 transition-colors">Products</Link>
            </li>
            <li>
              <a href="#" className="hover:text-accent-color transition-colors">Safety Information</a>
            </li>
            <li>
              <a href="#" className="hover:text-accent-color transition-colors">Cancellation Options</a>
            </li>
            <li>
              <a href="#" className="hover:text-accent-color transition-colors">Contact Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-accent-color transition-colors">Accessibility</a>
            </li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="text-lg text-primary font-semibold">STAY UPDATED</p>
          <p className="mt-3 text-sm text-text-secondary">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-primary rounded-l border border-custom h-9 px-3 outline-none text-primary placeholder:text-muted"
              placeholder="Your email"
            />
            <button className="flex items-center justify-center bg-accent-color hover:bg-accent-hover cursor-pointer h-9 w-9 aspect-square rounded-r transition-colors">
              {/* Arrow icon */}
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <hr className="border-custom mt-8" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p className="text-text-muted">
          © {new Date().getFullYear()} QuickMart|Made By Sumit|All rights
          reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <Link to="/about" className="hover:text-blue-500 transition-colors">About</Link>
          </li>
          <li>
            <a href="/" className="hover:text-accent-color transition-colors">Terms</a>
          </li>
          <li>
            <a href="/" className="hover:text-accent-color transition-colors">Sitemap</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
