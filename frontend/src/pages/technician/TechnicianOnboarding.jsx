
import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

const initialForm = {
  bio: "",
  experience_years: 0,
  location: "",
  phone_number: "",
  is_available: true,
  profile_photo: null,
};

function TechnicianOnboarding() {
  const [formData, setFormData] = useState(initialForm);
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);

  // Calculate profile completion
  const completedFields = useMemo(() => {
    return [
      Boolean(formData.bio.trim()),
      formData.experience_years !== "" &&
      Number(formData.experience_years) > 0,
      Boolean(formData.location.trim()),
      Boolean(formData.phone_number.trim()),
      Boolean(formData.category),
      Boolean(photoPreview),
    ].filter(Boolean).length;
  }, [formData, photoPreview]);

  const completion = Math.round((completedFields / 6) * 100);

  // Fetch existing profile
  useEffect(() => {
    let active = true;
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load service categories:", error);
      }
    };

    fetchCategories();
    const fetchProfile = async () => {
      try {
        const response = await api.get("/technicians/profile/");
        const data = response.data;

        if (!active) return;

        setFormData({
          bio: data.bio ?? "",
          experience_years: data.experience_years ?? 0,
          location: data.location ?? "",
          phone_number: data.phone_number ?? "",
          is_available: data.is_available ?? true,
          category: data.category ?? "",
          profile_photo: null,
        });

        setPhotoPreview(data.profile_photo ?? "");
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.detail ||
            "Unable to load your profile. Please refresh."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      active = false;
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? value === "" ? "" : Number(value)
            : value,
    }));

    setError("");
    setSuccess("");
  };

  // Handle profile photo
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be below 5 MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      profile_photo: file,
    }));

    setPhotoPreview(URL.createObjectURL(file));
    setError("");
    setSuccess("");
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      formData.experience_years === "" ||
      formData.experience_years < 0
    ) {
      setError("Please enter valid years of experience.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Please enter your working location.");
      return;
    }
    if (!formData.category) {
      setError("Please select your service category.");
      return;
    }
    if (!formData.phone_number.trim()) {
      setError("Please enter your contact number.");
      return;
    }

    setSaving(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          payload.append(key, value);
        }
      });

      await api.patch("/technicians/profile/", payload);

      setFormData((prev) => ({
        ...prev,
        profile_photo: null,
      }));

      setSuccess("Your professional profile has been saved.");
    } catch (err) {
      const data = err.response?.data;

      if (data && typeof data === "object") {
        const firstError = Object.values(data).flat()[0];

        setError(
          typeof firstError === "string"
            ? firstError
            : "Unable to update your profile."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F4]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#D9E83F] border-t-[#202827]" />
          <p className="text-sm text-muted">Preparing your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8F4] lg:grid lg:grid-cols-[340px_1fr]">
      {/* LEFT BRAND PANEL */}
      <aside className="relative flex min-h-screen flex-col justify-between bg-charcoal px-7 py-7 text-white md:px-10 lg:sticky lg:top-0 lg:h-screen lg:min-h-0 lg:px-10 lg:py-8">        <div>
        <a href="/" className="inline-flex items-center gap-2">
          <span className="display-font text-4xl font-bold tracking-tight">
            LOCOS
          </span>
          <span className="h-3 w-3 rounded-full bg-brand" />
        </a>

        <div className="mt-10 max-w-sm lg:mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
            Technician registration
          </p>

          <h1 className="display-font mt-5 text-5xl font-bold leading-[0.95]">
            Your skills.
            <br />
            Your reputation.
            <br />
            Your business.
          </h1>

          <p className="mt-6 text-sm leading-7 text-white/60">
            Create your professional identity on Locos.
            Help customers discover your expertise and
            connect with you for their service needs.
          </p>
        </div>
      </div>


        {/* PROFILE COMPLETION */}
        <div className="mt-8 shrink-0 border-t border-white/15 pt-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                Your progress
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Profile completion
              </p>
            </div>

            <span className="display-font text-4xl font-bold text-brand">
              {completion}%
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15 p-[2px]">
            <div
              className="h-full rounded-full bg-brand transition-all duration-700 ease-out"
              style={{ width: `${completion}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-white/50">
              {completedFields} of 5 completed
            </p>
            <p className="text-xs font-semibold text-brand">
              {completion === 100 ? "All done!" : "Keep going"}
            </p>
          </div>

          <p className="mt-8 text-xs leading-6 text-white/35">
            LOCOS — Connecting local talent with local needs.
          </p>
        </div>

      </aside>

      {/* RIGHT CONTENT */}
      <main className="min-w-0 bg-[#F1F3EC] px-5 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-3xl">
          {/* Heading */}
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Professional profile
            </p>

            <h2 className="display-font mt-3 text-5xl font-bold leading-none text-charcoal md:text-6xl">
              Tell us about yourself.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
              Your profile is how customers get to know you.
              Add accurate information about your experience,
              location and availability.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* PHOTO SECTION */}
            <section className="relative overflow-hidden border border-[#DDE2D8] bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md md:p-7">
              <div className="absolute left-0 top-0 h-1 w-16 bg-brand" />
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">
                  01 / Identity
                </p>
                <h3 className="display-font mt-2 text-3xl font-bold text-charcoal">
                  Profile photo
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-input">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Technician profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="display-font text-3xl font-bold text-muted">
                      ?
                    </span>
                  )}
                </div>

                <div>
                  <label className="inline-flex cursor-pointer bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#394442]">
                    Upload photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>

                  <p className="mt-3 text-xs text-muted">
                    JPG, PNG or WebP. Maximum 5 MB.
                  </p>
                </div>
              </div>
            </section>

            {/* PROFESSIONAL DETAILS */}
            <section className="relative overflow-hidden border border-[#DDE2D8] bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md md:p-7">
              <div className="absolute left-0 top-0 h-1 w-16 bg-brand" />
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">
                  02 / Expertise
                </p>
                <h3 className="display-font mt-2 text-3xl font-bold text-charcoal">
                  Professional details
                </h3>
              </div>

              <div className="space-y-6">

                <div>
                  <label
                    htmlFor="bio"
                    className="mb-2 block text-sm font-semibold text-charcoal"
                  >
                    About your work
                  </label>

                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={5}
                    maxLength={1000}
                    placeholder="Tell customers about your skills, expertise and the work you do..."
                    className="w-full resize-none border border-border bg-input p-4 text-sm leading-6 text-charcoal outline-none transition focus:border-charcoal"
                  />

                  <p className="mt-2 text-right text-xs text-muted">
                    {formData.bio.length}/1000
                  </p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-charcoal">
                    Service Category
                  </label>

                  <select
                    name="category"
                    value={formData.category || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm outline-none focus:border-charcoal"
                  >
                    <option value="">Select your service category</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="experience_years"
                    className="mb-2 block text-sm font-semibold text-charcoal"
                  >
                    Years of experience
                  </label>

                  <input
                    id="experience_years"
                    type="number"
                    name="experience_years"
                    min="0"
                    value={formData.experience_years}
                    onChange={handleChange}
                    className="w-full border border-border bg-input p-4 text-sm outline-none transition focus:border-charcoal"
                  />
                </div>

              </div>
            </section>

            {/* CONTACT DETAILS */}
            <section className="relative overflow-hidden border border-[#DDE2D8] bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md md:p-7">
              <div className="absolute left-0 top-0 h-1 w-16 bg-brand" />
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">
                  03 / Contact
                </p>
                <h3 className="display-font mt-2 text-3xl font-bold text-charcoal">
                  Where can customers find you?
                </h3>
              </div>

              <div className="space-y-6">

                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-semibold text-charcoal"
                  >
                    Working location
                  </label>

                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    maxLength={255}
                    placeholder="e.g. Madurai, Tamil Nadu"
                    className="w-full border border-border bg-input p-4 text-sm outline-none transition focus:border-charcoal"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone_number"
                    className="mb-2 block text-sm font-semibold text-charcoal"
                  >
                    Contact number
                  </label>

                  <input
                    id="phone_number"
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    maxLength={15}
                    placeholder="Enter your phone number"
                    className="w-full border border-border bg-input p-4 text-sm outline-none transition focus:border-charcoal"
                  />
                </div>

              </div>
            </section>

            {/* AVAILABILITY */}
            <section className="flex items-center justify-between gap-5 border border-border bg-white p-6 md:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted">
                  04 / Availability
                </p>

                <h3 className="mt-2 text-sm font-bold text-charcoal">
                  Accepting new jobs
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-5 text-muted">
                  Let customers know whether you're currently
                  available for new service requests.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-label="Toggle job availability"
                aria-checked={formData.is_available}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    is_available: !prev.is_available,
                  }))
                }
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${formData.is_available
                  ? "bg-charcoal"
                  : "bg-gray-300"
                  }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${formData.is_available ? "left-6" : "left-1"
                    }`}
                />
              </button>
            </section>

            {/* FEEDBACK */}
            {error && (
              <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* SUBMIT */}
            <div className="border-t border-border pt-7">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-brand px-6 py-5 text-sm font-bold uppercase tracking-[0.15em] text-charcoal transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving your profile..." : "Save professional profile"}
              </button>

              <p className="mt-4 text-center text-xs text-muted">
                You can update your professional information later.
              </p>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
}

export default TechnicianOnboarding;
