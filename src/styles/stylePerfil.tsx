import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const scale = size => (width / 375) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImageContainer: {
    width: "100%",
  },
  headerImage: {
    width: "100%",
    height: scale(220),
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: scale(-90),
  },
  profileImage: {
    width: scale(150),
    height: scale(150),
    borderRadius: 999,
    borderColor: "#fff",
    borderWidth: 2,
  },
  profileName: {
    fontSize: scale(26),
    fontWeight: "bold",
    marginTop: scale(10),
    color: "#f2921d",
  },
  menuIcon: {
    position: "absolute",
    top: scale(40),
    right: scale(20),
    zIndex: 1,
  },
  expContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(15),
    paddingHorizontal: scale(20),
  },
  level: {
    marginTop: scale(10),
    marginBottom: scale(25),
  },
  expBarBackground: {
    flex: 1,
    height: scale(30),
    backgroundColor: "#ccc",
    borderRadius: scale(10),
    justifyContent: "center",
    overflow: "hidden",
  },
  expBarFill: {
    position: "absolute",
    left: 0,
    width: "80%",
    height: scale(30),
    backgroundColor: "#002366",
    borderRadius: scale(10),
  },
  expText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    zIndex: 1,
    fontSize: scale(20),
  },
  levelText: {
    marginLeft: scale(10),
    fontSize: scale(24),
    color: "#002366",
    fontWeight: "bold",
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  conq: {
    marginTop: scale(20),
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    borderRadius: scale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  
    // Gradiente dourado (use LinearGradient no componente real)
    backgroundColor: "#FFD700",
  
    // Sombra para destacar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  
    // Borda levemente mais escura
    borderWidth: 1,
    borderColor: "#e5b800",
},

conqText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  conqImage: {
    marginTop: scale(20),
    width: scale(100),
    height: scale(100),
    borderRadius: scale(10),
    marginRight: scale(10),
  },
  conqNome: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  conqDescription: {
    fontSize: scale(13),
    color: "#000",
    marginTop: scale(4),
  },
  

});

export default styles;