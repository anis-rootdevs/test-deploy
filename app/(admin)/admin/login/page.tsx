import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
