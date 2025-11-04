import { generateSymbol } from "../utils/helper";

export const DynamicInput = ({ field, value, onChange, onFocus, onBlur, focusedField, currencyValue }: any) => {
    const Icon = field.iconDynamic ? generateSymbol(currencyValue) : field.icon;;
    const isFocused = focusedField === field.name;

    if (field.type === "select") {
        return (
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                </label>
                <select
                    name={field.name}
                    value={value}
                    onChange={onChange}
                    required={field.required}
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none appearance-none font-medium"
                >
                    {field.options?.map((opt: any) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
            </label>
            <div className="relative group">
                {Icon && (
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? 'text-blue-500' : 'text-gray-400'
                        }`}>
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <input
                    name={field.name}
                    type={field.type}
                    step={field.step}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => onFocus(field.name)}
                    onBlur={onBlur}
                    required={field.required}
                    className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none`}
                />
            </div>
        </div>
    );
};