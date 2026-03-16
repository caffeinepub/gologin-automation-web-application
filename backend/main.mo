import List "mo:core/List";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Profile = {
    id : Text;
    name : Text;
    isSelected : Bool;
  };

  module Profile {
    public func compare(profile1 : Profile, profile2 : Profile) : Order.Order {
      Text.compare(profile1.id, profile2.id);
    };
  };

  type LogEntry = {
    timestamp : Int;
    message : Text;
    profileId : ?Text;
  };

  type AutomationSettings = {
    targetUrl : Text;
    waitTime : Nat;
    autoClickEnabled : Bool;
  };

  type ProfileStatus = {
    profileId : Text;
    status : Text;
  };

  let profiles = List.empty<Profile>();
  let logs = List.empty<LogEntry>();
  let profileStatuses = List.empty<ProfileStatus>();
  let currentSettings = Map.empty<Text, AutomationSettings>();

  // Persistent state for ongoing operations
  var isRunning : Bool = false;

  // Initialize profiles (simulating GoLogin profiles)
  public shared ({ caller }) func initializeProfiles() : async () {
    if (profiles.size() > 0) { return };

    let initialProfiles = [
      { id = "1"; name = "প্রোফাইল ১"; isSelected = false },
      { id = "2"; name = "প্রোফাইল ২"; isSelected = false },
      { id = "3"; name = "প্রোফাইল ৩"; isSelected = false },
    ];
    profiles.addAll(initialProfiles.values());
  };

  // Toggle profile selection
  public shared ({ caller }) func toggleProfileSelection(profileId : Text) : async () {
    let updatedProfiles = profiles.map<Profile, Profile>(
      func(p) {
        if (p.id == profileId) {
          { id = p.id; name = p.name; isSelected = not p.isSelected };
        } else {
          p;
        };
      }
    );
    profiles.clear();
    profiles.addAll(updatedProfiles.values());
  };

  // Update automation settings
  public shared ({ caller }) func updateSettings(newSettings : AutomationSettings) : async () {
    currentSettings.add("settings", newSettings);
  };

  // Start automation process
  public shared ({ caller }) func startQueue() : async () {
    if (isRunning) { Runtime.trap("অপারেশন (operation) ইতিমধ্যে চলছে") };
    isRunning := true;

    let settings = switch (currentSettings.get("settings")) {
      case (?s) { s };
      case (null) { Runtime.trap("সেটিংস খুঁজে পাওয়া যায় নি") };
    };

    let selectedProfiles = profiles.filter(
      func(p) { p.isSelected }
    ).toArray();

    // Simulate processing each profile sequentially
    for (profile in selectedProfiles.values()) {
      if (not isRunning) { return };

      // Update status and log
      updateProfileStatus(profile.id, "চালু হচ্ছে (launching)");
      addLogEntry("প্রোফাইল চালু হচ্ছে: " # profile.name, ?profile.id);

      updateProfileStatus(profile.id, "URL লোড হচ্ছে (loading)");
      addLogEntry("URL লোড হচ্ছে: " # settings.targetUrl, ?profile.id);

      updateProfileStatus(profile.id, "স্ক্রল হচ্ছে (scrolling)");
      addLogEntry("পৃষ্ঠা স্ক্রল হচ্ছে", ?profile.id);

      if (settings.autoClickEnabled) {
        updateProfileStatus(profile.id, "অটো ক্লিক (auto-clicking)");
        addLogEntry("অটো ক্লিক সম্পন্ন হয়েছে", ?profile.id);
      };

      updateProfileStatus(profile.id, "সম্পন্ন (complete)");
      addLogEntry("অপারেশন সম্পন্ন হয়েছে", ?profile.id);
    };

    isRunning := false;
    addLogEntry("সমস্ত অপারেশন সম্পন্ন", null);
  };

  // Stop automation process
  public shared ({ caller }) func stopQueue() : async () {
    isRunning := false;
    addLogEntry("অপারেশন স্থগিত হয়েছে (cancelled)", null);
  };

  // Helper functions
  func updateProfileStatus(profileId : Text, status : Text) {
    let filteredStatuses = profileStatuses.filter(
      func(ps) { ps.profileId != profileId }
    );

    profileStatuses.clear();
    profileStatuses.addAll(filteredStatuses.values());

    profileStatuses.add({ profileId; status });
  };

  func addLogEntry(message : Text, profileId : ?Text) {
    let newEntry = {
      timestamp = Time.now();
      message;
      profileId;
    };
    logs.add(newEntry);
  };

  // Queries
  public query ({ caller }) func getProfiles() : async [Profile] {
    profiles.toArray().sort();
  };

  public query ({ caller }) func getLogs() : async [LogEntry] {
    logs.toArray();
  };

  public query ({ caller }) func getProfileStatuses() : async [ProfileStatus] {
    profileStatuses.toArray();
  };

  public query ({ caller }) func isOperationRunning() : async Bool {
    isRunning;
  };
};
