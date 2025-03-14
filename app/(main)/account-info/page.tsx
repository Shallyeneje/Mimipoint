import ProfileCard from "@/components/pages/accountInfo/profileCards";

export default function Page() {
  return (
    <ProfileCard
      name="Ndukwe Chiagoziem"
      username="Gozzy"
      role="Customer"
      gender="Male"
      contact="08080945678"
      email="chiagoziendukwe90@gmail.com"
      dateJoined="4th Dec, 2025"
      balance={765}
      transactions={34}
    />
  );
}
