var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var mongoose = require('mongoose');
var Place = mongoose.model('Place');
/*
{
  "name": "Hotel Boss",
  "description": "Hotel",
  "lng": 103.860463,
  "lat": 1.306027
}
{
  "name": "Potato Head",
  "description": "three bun",
  "lng": 103.841765,
  "lat": 1.280630
}
*/
var find = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, lng, lat, _b, distance, myPlaces;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, lng = _a.lng, lat = _a.lat, _b = _a.distance, distance = _b === void 0 ? 1 / 3963.2 : _b;
                console.log("###", lng, lat, distance);
                return [4 /*yield*/, Place.find({
                        location: {
                            $geoWithin: {
                                $centerSphere: [[lng, lat], distance]
                            }
                        }
                    }).catch(function (err) {
                        console.log("error on fetch", err);
                        res.status(500).json({
                            "message": "error"
                        });
                    })];
            case 1:
                myPlaces = _c.sent();
                return [2 /*return*/];
        }
    });
}); };
var findAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var myPlaces;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Place.find().catch(function (err) {
                    console.log("error on fetch", err);
                    res.status(500).json({
                        "message": "error"
                    });
                })];
            case 1:
                myPlaces = _a.sent();
                console.log("myPlaces", myPlaces);
                if (!myPlaces) {
                    res.status(404).json({
                        "message": "Not Found"
                    });
                }
                res.json(myPlaces);
                return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var type, _a, name, description, lng, lat, myPlace;
    return __generator(this, function (_b) {
        type = "Point";
        _a = req.body, name = _a.name, description = _a.description, lng = _a.lng, lat = _a.lat;
        myPlace = new Place({
            name: name,
            description: description,
            location: {
                type: type,
                coordinates: [lng, lat]
            }
        });
        myPlace.save(function (err, place) {
            if (err) {
                res.status(500).json({
                    "message": err
                });
            }
            res.send(place);
        });
        return [2 /*return*/];
    });
}); };
module.exports = {
    create: create,
    find: find,
    findAll: findAll
};
