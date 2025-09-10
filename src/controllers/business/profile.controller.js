// Edit Profile Controller
export function getProfile() {
  return {
    id: 1,
    fullName: "Emmanuel Oluwafemi Odeyale",
    gender: "Male",
    email: "eodeyale@synkkafrica.com",
    state: "Lagos state",
    country: "Nigeria",
    mobile: "+2348065017856",
    image: "/images/profile-placeholder.png"
  };
}

export function updateProfile(profile) {
  // Simulate update (in real app, persist to DB)
  return { ...profile, updated: true };
}
