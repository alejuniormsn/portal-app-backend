import { Router } from "express";
import UserController from "../controllers/userController";
import { verifyToken } from "../jwt/jwt";

const control = new UserController();

const userRouter = Router();

userRouter.get("/users", verifyToken, control.getAllUsers.bind(control));
userRouter.get(
  "/users-group/:access_group",
  verifyToken,
  control.getAllUsersByGroup.bind(control)
);
userRouter.get(
  "/user-name/:name",
  verifyToken,
  control.getUserByName.bind(control)
);
userRouter.get("/user/:id", verifyToken, control.getUser.bind(control));
userRouter.get(
  "/user-registration/:registration",
  verifyToken,
  control.getUserByRegistration.bind(control)
);
userRouter.put(
  "/user-registration/:id",
  verifyToken,
  control.updateUser.bind(control)
);
userRouter.patch(
  "/user-registration/:id",
  verifyToken,
  control.updatePassword.bind(control)
);
userRouter.post("/login", control.login.bind(control));
userRouter.post("/register", control.register.bind(control));

// ------- UserApiGlobus ---------
userRouter.get(
  "/consulta-user/:chapafunc",
  verifyToken,
  control.getUserApiGlobus.bind(control)
);

// ------- AccessGroup ---------
userRouter.get("/groups", control.getAllGroups.bind(control));
userRouter.get("/group/:access_group", control.getGroupsByGroup.bind(control));
userRouter.post("/group", verifyToken, control.createGroup.bind(control));
userRouter.delete("/group/:id", verifyToken, control.deleteGroup.bind(control));
userRouter.put("/group/:id", verifyToken, control.updateGroup.bind(control));
// ------- Department ---------
userRouter.get("/departments", control.getAllDepartments.bind(control));
userRouter.get("/department/:id", control.getDepartment.bind(control));
userRouter.put(
  "/department/:id",
  verifyToken,
  control.updateDepartment.bind(control)
);
userRouter.delete(
  "/department/:id",
  verifyToken,
  control.deleteDepartment.bind(control)
);
userRouter.post(
  "/department",
  verifyToken,
  control.createDepartment.bind(control)
);

export default userRouter;
