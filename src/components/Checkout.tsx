'use client';
import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Input, Checkbox, Form, Result, Space, Divider, Tag, message,Alert } from "antd";
import { 
  CreditCardOutlined, 
  SafetyCertificateOutlined, 
  CheckCircleOutlined,
  DownloadOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";
import { useCart } from "@/components/cartContext";
import { CheckoutFormData, CheckoutErrors, CheckoutStep } from "@/utils/data/types/cart";

const GST_RATE = 0.18;

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  
  const [step, setStep] = useState<CheckoutStep>("form");
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [otpValues, setOtpValues] = useState<string[]>(new Array(6).fill(""));
  const [otpError, setOtpError] = useState<string>("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const gst = subtotal * GST_RATE;
  const totalAmount = Number((subtotal + gst).toFixed(2));

  const onlyDigits = (s: string): string => s.replace(/\D/g, "");

  // Form validation
  const validateForm = useCallback((): boolean => {
    const values = form.getFieldsValue();
    const newErrors: CheckoutErrors = {};

    if (!values.name?.trim()) newErrors.name = "Full name is required";

    const digitsCard = onlyDigits(values.card || "");
    if (!digitsCard || digitsCard.length < 12 || digitsCard.length > 19) {
      newErrors.card = "Enter a valid card number (12–19 digits)";
    }

    const exp = values.expiry?.trim() || "";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
      newErrors.expiry = "Expiry must be MM/YY";
    }

    if (!/^\d{3,4}$/.test(values.cvc || "")) {
      newErrors.cvc = "CVC must be 3 or 4 digits";
    }

    if (!values.terms) newErrors.terms = "You must accept terms & privacy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  // Submit payment
    const handleFormSubmit = async (values: CheckoutFormData) => {
    if (!validateForm()) return;

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setOtpValues(new Array(6).fill(""));
    setOtpError("");
    setStep("otp");

    // Wait until step updates, then show OTP
    setTimeout(() => {
        alert(`Demo OTP: ${otp}`);   // 👈 replaced message.info with alert
        otpRefs.current[0]?.focus();
    }, 200);
    };


  // OTP logic
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      setOtpValues(newOtpValues);
    }
  };

  const submitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpValues.join("");
    if (entered.length < 6) return setOtpError("Please enter the 6-digit code");
    if (entered !== generatedOtp) return setOtpError("Invalid code. Try again");

    setOtpError("");
    setStep("success");
    clearCart();
  };

    const resendOtp = () => {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setOtpValues(new Array(6).fill(""));
    setOtpError("");

    setTimeout(() => {
        alert(`New demo OTP: ${otp}`); 
        otpRefs.current[0]?.focus();
    }, 200);
    };


  const handleBackToCourses = () => router.push("/");
  const handleDownloadReceipt = () => message.success("Receipt download placeholder");

  // Confetti effect
  const Confetti: React.FC = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-5 rounded-sm opacity-90 animate-bounce
            ${i % 6 === 0 ? 'bg-red-400' : ''}
            ${i % 6 === 1 ? 'bg-yellow-400' : ''}
            ${i % 6 === 2 ? 'bg-green-400' : ''}
            ${i % 6 === 3 ? 'bg-blue-400' : ''}
            ${i % 6 === 4 ? 'bg-purple-400' : ''}
            ${i % 6 === 5 ? 'bg-pink-400' : ''}`}
          style={{
            left: `${8 + (i * 4)}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${2 + i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );

  // Empty cart
  if (cartItems.length === 0 && step === "form") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center">
          <Result
            status="info"
            title="Your cart is empty"
            subTitle="Please add some courses before proceeding to checkout"
            extra={<Button type="primary" onClick={() => router.push("/")}>Browse Courses</Button>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-4 py-8">
      {/* Payment form */}
      {step === "form" && (
        <Card className="w-full max-w-md shadow-xl border-0" styles={{ body:{padding: "24px"} }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CreditCardOutlined /> Payment Details
            </h3>
            <Tag color="orange" className="text-base font-semibold py-1 px-3">
              ${totalAmount.toFixed(2)}
            </Tag>
          </div>

          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              name="name"
              label="Cardholder Name"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name}
            >
              <Input size="large" placeholder="Full name on card" />
            </Form.Item>

            <Form.Item
              name="card"
              label="Card Number"
              validateStatus={errors.card ? "error" : ""}
              help={errors.card}
              getValueFromEvent={(e) => {
                let digits = onlyDigits(e.target.value).slice(0, 16);
                return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
              }}
            >
              <Input size="large" placeholder="Valid card number" maxLength={19} />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="expiry"
                label="Expiry (MM/YY)"
                validateStatus={errors.expiry ? "error" : ""}
                help={errors.expiry}
                getValueFromEvent={(e) => {
                  let value = onlyDigits(e.target.value).slice(0, 4);
                  if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
                  return value;
                }}
              >
                <Input size="large" placeholder="MM/YY" maxLength={5} inputMode="numeric" />
              </Form.Item>

              <Form.Item
                name="cvc"
                label="CVC"
                validateStatus={errors.cvc ? "error" : ""}
                help={errors.cvc}
                getValueFromEvent={(e) => onlyDigits(e.target.value).slice(0, 4)}
              >
                <Input.Password size="large" placeholder="CVC" maxLength={4} />
              </Form.Item>
            </div>

            <Form.Item
              name="terms"
              valuePropName="checked"
              validateStatus={errors.terms ? "error" : ""}
              help={errors.terms}
            >
              <Checkbox>I accept the <a href="#privacy" className="text-purple-600">terms & privacy</a></Checkbox>
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" block>
              Validate & Process Payment
            </Button>

            <Divider dashed>Accepted Payment Methods</Divider>
            <div className="flex flex-wrap gap-2 justify-center">
              {["VISA", "MasterCard", "Google Pay", "Apple Pay"].map((m) => (
                <Tag key={m} color="blue">{m}</Tag>
              ))}
            </div>
          </Form>
        </Card>
      )}

      {/* OTP */}
      {step === "otp" && (
        <Card className="w-full max-w-md shadow-xl border-0 text-center" bodyStyle={{ padding: "24px" }}>
          <SafetyCertificateOutlined className="text-4xl text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Enter OTP</h3>
          <form onSubmit={submitOtp} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  maxLength={1}
                  inputMode="numeric"
                  className="w-12 h-14 border rounded-md text-center text-xl font-semibold focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            {otpError && <Alert message={otpError} type="error" showIcon />}
            <Space direction="vertical" className="w-full">
              <Button type="primary" htmlType="submit" size="large">Submit Code</Button>
              <Button type="link" onClick={resendOtp}>Resend Code</Button>
              <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => setStep("form")}>Back to payment</Button>
            </Space>
          </form>
        </Card>
      )}

      {/* Success */}
      {step === "success" && (
        <div className="relative w-full max-w-2xl">
          <Card className="shadow-2xl border-0 text-center relative z-10" bodyStyle={{ padding: "40px" }}>
            <Result
              icon={<CheckCircleOutlined className="text-green-500" />}
              status="success"
              title="Transaction Successful!"
              subTitle={`Your payment of $${totalAmount.toFixed(2)} has been processed successfully.`}
              extra={[
                <Button key="courses" type="primary" size="large" onClick={handleBackToCourses}>Back to Courses</Button>,
                <Button key="receipt" icon={<DownloadOutlined />} size="large" onClick={handleDownloadReceipt}>Download Receipt</Button>,
              ]}
            />
          </Card>
          <Confetti />
        </div>
      )}
    </div>
  );
};

export default Checkout;
