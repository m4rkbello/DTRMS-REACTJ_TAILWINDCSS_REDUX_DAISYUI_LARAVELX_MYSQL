<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use DB;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Attendance::all();

        return response($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('Received attendance request', ['data' => $request->all()]);
    
        try {
            $data = $request->validate([
                'employee_email' => 'required|string',
            ]);
    
            Log::info('Validated request data', $data);
    
            $employee = Employee::where('employee_email', $data['employee_email'])->first();
    
            if (!$employee) {
                Log::warning('Employee not found', ['employee_email' => $data['employee_email']]);
                return response([
                    'success' => false,
                    'status' => 401,
                    'message' => 'No existing employee!',
                ], 401);
            };

            //id-sa-empleyado
            $employeeId = $employee->id;
            $timeIn = 'Time-in';
            $timeOut = 'Time-out';

            $attendanceCollections = Attendance::where('attendance_employee_id', '=', $employeeId)
            ->whereDate('created_at', Carbon::today())
            ->exists();

            $attendanceCollectionsTimein = Attendance::where('attendance_employee_id', '=', $employeeId)
            ->whereDate('created_at', Carbon::today())
            ->where('attendance_status','=',1)
            ->exists();

            $attendanceCollectionsTimeout = Attendance::where('attendance_employee_id', '=', $employeeId)
            ->where('attendance_status','=',2)
            ->whereDate('created_at', Carbon::today())
            ->exists();

            if(!$attendanceCollections){
                $attendance = Attendance::create([
                    'attendance_employee_id' => $employeeId,
                    'attendance_note' => $timeIn,
                    'attendance_time_in' => Carbon::now(),
                    // 'attendance_time_out' => Carbon::now(),
                    'attendance_status' => 1,
                ]);
            }elseif($attendanceCollectionsTimein && !$attendanceCollectionsTimeout){
                    $attendance = Attendance::create([
                        'attendance_employee_id' => $employeeId,
                        'attendance_note' => $timeOut,
                        // 'attendance_time_in' => Carbon::now(),
                        'attendance_time_out' => Carbon::now(),
                        'attendance_status' => 2,
                    ]);
            }elseif($attendanceCollectionsTimein && $attendanceCollectionsTimeout){
                return response()->json([
                    'success' => true,
                    'details' => $attendanceCollections,
                    'message' => 'Duplicated Employee Attendance!',
                ], 401);

            }else{
                return response()->json([
                    'success' => true,
                    'details' => $attendanceCollections,
                    'message' => 'Duplicated Employee Attendance!',
                ], 401);
    
            }   

            Log::info('Attendance created successfully', [
                'employee_id' => $employeeId,
                'attendance_id' => $attendance->id,
                'attendance_time_in' => $attendance->attendance_time_in,
                'attendance_time_out' => $attendance->attendance_time_out,
                'parse'=> $attendanceCollections, 
            ]);
    
            return response()->json([
                'success' => true,
                'details' => $attendance,
                'message' => 'Employee has been successfully added!',
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error: ' . $e->getMessage(), ['errors' => $e->errors()]);
            return response()->json([
                'success' => false,
                'status' => 422,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('Model not found: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'status' => 404,
                'message' => 'Resource not found',
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error creating attendance: ' . $e->getMessage(), [
                'exception' => get_class($e),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return response()->json([
                'success' => false,
                'status' => 500,
                'message' => 'An error occurred while processing your request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
