"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Common {
    checkIfExists(users, user, pop) {
        let i = 0;
        let exists = false;
        while (i < users.length) {
            if (users[i]._id === user._id) {
                if (pop) {
                    users.splice(i, 1);
                }
                exists = true;
            }
            i++;
        }
        if (!exists) {
            users.push(user);
        }
        return users;
    }
}
exports.Common = Common;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvc3RhZ21hLWFwcC9zcmMvYXBwL2xpYi9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFhLE1BQU07SUFFVixhQUFhLENBQUMsS0FBYyxFQUFFLElBQVcsRUFBRSxHQUFZO1FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUM3QixJQUFJLEdBQUcsRUFBRTtvQkFDUCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDcEI7Z0JBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNmO1lBQ0QsQ0FBQyxFQUFFLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0Y7QUFuQkQsd0JBbUJDIn0=