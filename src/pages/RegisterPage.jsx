import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaBriefcase, FaBuilding, FaMapMarkerAlt, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';


// A simple, stable input component that won't re-render unnecessarily
const SimpleInput = ({
  id,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  label,
  error,
  touched,
  disabled = false
}) => (
  <div className={`mb-3 ${error && touched ? 'input-error' : ''}`}>
    <label htmlFor={id} className="block text-xs font-medium text-[#D4AF37] mb-1 ml-0.5">
      {label}
    </label>
    <div className="relative flex items-center bg-[rgba(15,15,15,0.65)] border border-[#D4AF37]/40 rounded-md transition-all duration-200 shadow-sm overflow-hidden hover:border-[#D4AF37] focus-within:border-[#D4AF37] focus-within:shadow-[0_0_0_1px_rgba(212,175,55,0.15)] focus-within:bg-[rgba(20,20,20,0.75)]">
      <span className="absolute left-3 text-[#D4AF37]/70 transition-colors duration-200">
        {icon}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full py-2.5 pl-9 pr-3 bg-transparent text-white border-none text-sm focus:outline-none"
        autoComplete="off"
      />
    </div>
    {error && touched && (
      <p className="text-red-400 text-[11px] mt-1 bg-red-400/10 py-0.5 px-2 rounded border-l-2 border-red-400 font-medium">
        {error}
      </p>
    )}
  </div>
);

function RegisterPage() {
  // Route params
  const { source } = useParams();
  const isFromSponsorshipTiers = source === 'sponsor';

  const spreadSheetAPi = import.meta.env.VITE_GOOGLE_SPREADSHEET_API_KEY;



  // Form state using a single state object
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    organization: '',
    city: '',
  });

  // Tracking state
  const [touched, setTouched] = useState({}); // Fields that have been interacted with
  const [errors, setErrors] = useState({});   // Validation errors
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [isLoaded, setIsLoaded] = useState(false); // Animation state
  const [isMobile, setIsMobile] = useState(false); // Responsive layout state

  // Assets
  const logo = "https://ik.imagekit.io/patelswadesh/logo.png";

  // Mobile detection effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize with throttling
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Component mount and scroll effect
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Prevent scrolling on mobile
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    // Trigger animation
    const animationTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
      clearTimeout(animationTimer);
    };
  }, [isMobile]);

  // Form validation logic
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'role':
        if (!value.trim()) {
          error = 'Role is required';
        }
        break;

      case 'organization':
        if (!value.trim()) {
          error = 'Organization is required';
        }
        break;

      case 'city':
        if (!value.trim()) {
          error = 'City is required';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Validate the entire form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate each field
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Update the errors state
    setErrors(newErrors);

    // Mark all fields as touched
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    return isValid;
  };

  // Email sending functionality using EmailJS
  const sendEmail = async (e, emailData) => {
    e.preventDefault();
    // Initialize EmailJS
    emailjs.init("JsHXkmU0sAUI5fJQI");

    try {
      // Send the email using EmailJS
      const response = await emailjs.send(
        "service_7e8sz6p",  // EmailJS service ID
        "template_04ddgd5", // EmailJS template ID
        emailData,
        "JsHXkmU0sAUI5fJQI" // User ID
      );

      console.log("Email sent successfully:", response);
      return { success: true, response };
    } catch (error) {
      console.error("Failed to send email:", error);
      return { success: false, error };
    }
  };

  // Google Sheets update functionality
  const updateOnSpreadsheet = async (data) => {
    console.log("Data to be sent to Google Sheets:", data);
    const scriptURL = spreadSheetAPi;

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams(data),
      });

      const result = await response.text();
      console.log("Google Sheet update result:", result);
      return { success: true, result };
    } catch (error) {
      console.error("Error updating Google Sheet:", error);
      return { success: false, error };
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    const isValid = validateForm();

    if (!isValid) {
      // Focus the first field with an error
      const firstErrorField = document.querySelector('.input-error');
      if (firstErrorField) {
        const inputElement = firstErrorField.querySelector('input');
        if (inputElement) {
          inputElement.focus();
        }
      }
      return;
    }

    // Set submitting state to show loading indicator
    setIsSubmitting(true);

    try {
      // Prepare email data
      const emailData = {
        to_email: "patelswadesh7@gmail.com",
        from_name: "Eduthon",
        subject: "New Registration from " + formData.name,
        user_name: formData.name,
        user_email: formData.email,
        user_role: formData.role,
        user_organization: formData.organization,
        user_city: formData.city,
      };


      // Send email without passing the event object
      const result = await sendEmail(e, emailData);
      if (result && result.success) {
        const resultSpreadSheet = await updateOnSpreadsheet({
          name: formData.name,
          email: formData.email,
          organisation: formData.organization,
          role: formData.role,
          city: formData.city
        });
        console.log("Google Sheets update result:", resultSpreadSheet);
      }

      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/85 border border-[#D4AF37] rounded-lg p-4 text-center z-50 shadow-xl backdrop-blur-lg opacity-0 transition-all duration-300 max-w-[90%] w-64';
      successMessage.innerHTML = `
        <div class="bg-[#D4AF37] text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">✓</div>
        <div class="text-[#D4AF37] text-lg font-semibold mb-1">Thank you!</div>
      `;
      document.body.appendChild(successMessage);

      setTimeout(() => {
        successMessage.classList.add('opacity-100');
      }, 10);

      setTimeout(() => {
        successMessage.classList.remove('opacity-100');
        setTimeout(() => {
          document.body.removeChild(successMessage);
          document.body.style.overflow = '';

          setFormData({
            name: '',
            email: '',
            role: '',
            organization: '',
            city: '',
          });
          setTouched({});
          setErrors({});
          setIsSubmitting(false);
        }, 300);
        handleGoBack();
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      document.body.style.overflow = '';

      // Show error message to user
      alert("There was an error sending your registration. Please try again later.");
    }
  };

  // Navigation handler with proper safeguards
  const handleGoBack = () => {
    // Prevent navigation during form submission
    if (isSubmitting) return;

    // Use history API to navigate back
    window.history.back();
  };

  // Simple event handlers for form fields
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    // If the field has already been touched, validate on change
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field) => (e) => {
    const value = e.target.value;

    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate field on blur
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <div className={` ${isMobile ? 'mt-[-20px]' : 'mt-[-100px]'} h-screen space-y-auto w-full m-0 flex justify-center items-start md:items-center relative bg-black transition-all duration-300 opacity-0 translate-y-5 overflow-hidden ${isLoaded ? 'opacity-100 translate-y-0' : ''}`}>
      <div className="fixed inset-0 bg-gradient-to-b from-black/85 to-black/95 -z-20" />
      <div className="fixed inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.1)_1px,transparent_1px),radial-gradient(circle,rgba(212,175,55,0.1)_1px,transparent_2px)] bg-[length:30px_30px,80px_80px] opacity-25 -z-10 animate-[patternMove_30s_linear_infinite] hidden md:block" />

      <button
        onClick={handleGoBack}
        className="fixed top-3 left-3 bg-black/80 text-[#D4AF37] border border-[#D4AF37] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-50 shadow-lg backdrop-blur-md hover:bg-[#D4AF37]/15 hover:-translate-x-1 active:translate-x-0 disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="Go back"
        disabled={isSubmitting}
      >
        <FaArrowLeft size={14} />
      </button>

      <div className="w-screen h-auto mt-0 md:h-auto md:max-w-sm lg:max-w-md bg-[rgba(8,8,8,0.9)] backdrop-blur-lg rounded-none md:rounded-lg shadow-xl border-none md:border md:border-[#D4AF37]/20 flex flex-col m-0 mt-0 md:min-h-0 md:my-4 overflow-hidden overflow-y-hidden">
        <div className="pt-[calc(3vh+16px)] md:pt-4 px-4 pb-[calc(1.5vh+8px)] md:pb-4 text-center relative bg-gradient-to-b from-[rgba(15,15,15,0.9)] via-[rgba(15,15,15,0.4)] to-transparent border-b border-[#D4AF37]/15 overflow-hidden mb-10" style={{
          marginTop: isMobile ? '0px' : '10px'
        }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
          <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#D4AF37]/5 blur-xl"></div>
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#D4AF37]/5 blur-xl"></div>

          <div className="w-full h-[calc(3vh+24px)] md:h-10 flex justify-center items-center mb-[calc(0.5vh+4px)] md:mb-2">
            <img
              src={logo} alt="Logo"
              className={isMobile ? "h-auto w-[calc(8vw+24px)] max-w-[80px] object-cover rounded-full animate-[gentle-pulse_3s_infinite_alternate] relative z-10" : "h-10 object-cover rounded-full animate-[gentle-pulse_3s_infinite_alternate] relative z-10"}
            />
          </div>
          <h3 className="text-[calc(1.2rem+1vh)] md:text-xl font-bold mb-[calc(0.5vh+4px)] md:mb-2 bg-gradient-to-r from-[#D4AF37] to-[#E9C767] bg-clip-text text-transparent">
            Register Your Interest
          </h3>
          <p className="text-white/70 text-[calc(0.75rem+0.2vh)] md:text-xs max-w-[85%] mx-auto">
            Join us for the premier summit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="py-auto px-6 md:p-6 mx-auto w-full max-w-full md:max-w-[400px] lg:max-w-[450px] flex-grow flex flex-col justify-between overflow-y-hidden">
          <div className="space-y-1.5 md:space-y-2">
            <SimpleInput
              id="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Enter full name"
              icon={<FaUser size={isMobile ? 16 : 14} />}
              error={errors.name}
              touched={touched.name}
              disabled={isSubmitting}
            />

            <SimpleInput
              id="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Enter email address"
              icon={<FaEnvelope size={isMobile ? 16 : 14} />}
              error={errors.email}
              touched={touched.email}
              disabled={isSubmitting}
            />

            <SimpleInput
              id="role"
              label="Your Role"
              value={formData.role}
              onChange={handleChange('role')}
              onBlur={handleBlur('role')}
              placeholder="Enter role"
              icon={<FaBriefcase size={isMobile ? 16 : 14} />}
              error={errors.role}
              touched={touched.role}
              disabled={isSubmitting}
            />

            <SimpleInput
              id="organization"
              label="Organization"
              value={formData.organization}
              onChange={handleChange('organization')}
              onBlur={handleBlur('organization')}
              placeholder="Enter organization"
              icon={<FaBuilding size={isMobile ? 16 : 14} />}
              error={errors.organization}
              touched={touched.organization}
              disabled={isSubmitting}
            />

            <SimpleInput
              id="city"
              label="City"
              value={formData.city}
              onChange={handleChange('city')}
              onBlur={handleBlur('city')}
              placeholder="Enter city"
              icon={<FaMapMarkerAlt size={isMobile ? 16 : 14} />}
              error={errors.city}
              touched={touched.city}
              disabled={isSubmitting}
            />
          </div>

          <div className="md:mt-auto p-0">
            <button
              type="submit"
              className={`w-full mt-1 md:mt-3 mb-2 md:mb-3 h-12 md:h-10 flex items-center justify-center gap-2 font-semibold px-4 rounded-md cursor-pointer text-sm transition-all duration-300 bg-gradient-to-r from-[#D4AF37] to-[rgba(182,149,35,0.95)] text-black shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed ${isSubmitting ? 'bg-gradient-to-r from-[#D4AF37]/70 to-[rgba(182,149,35,0.7)]' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Register Now</span>
                  <FaPaperPlane size={14} />
                </>
              )}
            </button>
            <p className="text-center text-white/60 text-[9px] md:text-[10px] py-1 md:py-1.5 px-2 md:px-3 rounded-md max-w-[95%] mx-auto leading-tight border border-white/5 mt-1 md:mt-2">
              We respect your privacy and will not share your data.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;